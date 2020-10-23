const sql = require("./db.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.user_role = user.user_role;
  this.user_email = user.user_email;
};

User.create = (user, result) => {
  let userPromise = new Promise(function(userResolve, userReject)
  {
    sql.query("INSERT INTO user SET ?", user, (err, res) => {
      if (err) {
        result(err, null);
        userReject(err);
      }
      else
      {
        user.user_id = res.insertId;
        console.log("created user: ", user);
        result(null, user);
        userResolve(user);
      }
    });
  });
  // Wait for user to be created then create corresponding tables
  userPromise.then(
    function(response) {
      // Determine the role of the created user and create corresponding tables
      if(response.user_role == "student") {createStudent(response);}
      // put advisor create here
      // put admin create here
    },
    function(error) {
      console.log("error: ", error);
      return;
    }
  );
};

// If the created user's role was student, make student, plan, and student_user tables 
// where all tables have appropriate foreign keys
function createStudent(user) {
  // Create student
  let stuPromise = new Promise(function(stuResolve, stuReject)
  {
    sql.query(`INSERT INTO student VALUES()`, (err, res) => {
      if (err) {
        result(err, null);
        stuReject(err);
      }
      else
      {
        console.log("created student with id: ", res.insertId);
        stuResolve(res);
      }
    }); 
  });
  // Wait for student to be created then make plan and student_user
  stuPromise.then(
    function(response) {
      sql.query(`INSERT INTO plan VALUES("", ${response.insertId})`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else {console.log("created plan where plan_id= ", res.insertId, " and stu_id= ", response.insertId);}
      });
      sql.query(`INSERT INTO student_user VALUES(${user.user_id}, ${response.insertId})`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created student_user where user_id= ", user.user_id, " and stu_id= ", response.insertId);
      });
    },
    function(error) {
      console.log("error: ", error);
      return;
    }
  );
}

User.findAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};

User.findById = (userid, result) => {
  sql.query(`SELECT * FROM user WHERE user.user_id = "${userid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (userEmail, result) => {
  sql.query(`SELECT * FROM user WHERE user.user_email = "${userEmail}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    `UPDATE user SET user_role = "${user.user_role}", user_email = "${user.user_email}"  WHERE user_id = ${id}`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query(`DELETE FROM user WHERE user_id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;