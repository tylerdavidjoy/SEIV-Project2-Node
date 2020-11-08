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
      else if (response.user_role == "advisor") {createAdvisor(response);}
      // put admin create here
    },
    function(error) {
      console.log("error: ", error);
      return;
    }
  );
};

// If the created user's role was student, make student, plan, semester, and student_user tables 
// where all tables have appropriate foreign keys
function createStudent(user) {
  // Create student
  let stuPromise = new Promise(function(stuResolve, stuReject)
  {
    sql.query(`INSERT INTO student SET stu_name = "${user.user_email}"`, (err, res) => {
      if (err) {
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
      const student_id = response;
      let stuPlanIdPromise = new Promise(function(stuPlanIdResolve, stuPlanIdReject)
      {
        sql.query(`INSERT INTO plan VALUES("", ${response.insertId}, NOW())`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            stuPlanIdReject(err);
          }
          else 
          {
            console.log("created plan where plan_id= ", res.insertId, " and stu_id= ", response.insertId);
            stuPlanIdResolve(res.insertId);
          }
        });
        
        sql.query(`INSERT INTO student_user VALUES(${user.user_id}, ${response.insertId})`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            return;
          }
          console.log("created student_user where user_id= ", user.user_id, " and stu_id= ", response.insertId);
        });
      });
      stuPlanIdPromise.then(
        function(response) {
          sql.query(`UPDATE student SET plan_id = "${response}"  WHERE stu_id = ${student_id.insertId}`,(err, res) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
          });
          let date = new Date();
          let year = date.getFullYear();
          let type;
          for(let i = 0; i < 8; i++)
          {
            if(i % 2 === 0)
              type = 'fall';
            else
              type = 'spring';
            if(i % 2 === 1)
              year++;

            sql.query(`INSERT INTO semester SET plan_id = "${response}", semester_type = "${type}", year = "${year}"`, (err, res) => {
              if (err) {
                console.log("error: ", err);
                return;
              }
            });
          }
        },
        function(error)
        {
          console.log("error: ", error);
          return;
        }
      );
    },
    function(error) {
      console.log("error: ", error);
      return;
    }
  );
}

// If the created user's role was advisor, make advisor and advisor_user tables 
// where all tables have appropriate foreign keys
function createAdvisor(user) {
  // Create student
  let advPromise = new Promise(function(advResolve, advReject)
  {
    sql.query(`INSERT INTO advisor SET adv_name = "${user.user_email}"`, (err, res) => {
      if (err) {
        advReject(err);
      }
      else
      {
        console.log("created advisor with id: ", res.insertId);
        advResolve(res);
      }
    }); 
  });
  // Wait for advisor to be created then make advisor_user
  advPromise.then(
    function(response) {
      sql.query(`INSERT INTO advisor_user VALUES(${user.user_id}, ${response.insertId})`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log("created advisor_user where user_id= ", user.user_id, " and adv_id= ", response.insertId);
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
  sql.query(`UPDATE user SET user_email = "${user.user_email}"  WHERE user_id = ${id}`,(err, res) => {
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
  sql.query(`SELECT * FROM user WHERE user_id = "${id}"`, (err, res) => {
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
    console.log(res[0].user_role);
    if(res[0].user_role == "student")
    {
      console.log("true");
      stuDelete(id);
    }
    result(null, res);
  });
};

function stuDelete(id)
{
  let stuDelPromise = new Promise(function(stuDelResolve, stuDelReject) {
    sql.query(`SELECT * FROM student_user WHERE user_id = "${id}"`, (err, res) => {
      if (err) {
        stuDelReject(err);
      }
      else
      {
        stuDelResolve(res[0].stu_id);
      }
    });
  });
  stuDelPromise.then(
    // response is id of corresponding student to be deleted
    function(response) {
      sql.query(`DELETE FROM user WHERE user_id = "${id}"`, (err, res) => {
        if (err) {
          return;
        }
      });
      console.log(response);
      sql.query(`DELETE FROM student WHERE stu_id = "${response}"`, (err, res) => {
        if (err) {
          return;
        }
      });
    },
    function(error) {
      console.log("error: ", error);
      return;
    }
  );
};

module.exports = User;

