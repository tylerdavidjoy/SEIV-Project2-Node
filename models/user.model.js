const sql = require("./db.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.user_role = user.user_role;
  this.user_email = user.user_email;
};

User.create = (user, result) => {

  console.log(user.user_role);
  sql.query(`INSERT INTO courses.user VALUES( "", "${user.user_role}", "${user.user_email}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { user_id: res.insertId, ...user });
    result(null, { user_id: res.insertId, ...user });
  });
};

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