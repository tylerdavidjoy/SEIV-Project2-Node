const sql = require("./db.js");

// constructor
const Student_User = function(student_user) {
  this.user_id = student_user.user_id;
  this.stu_id = student_user.stu_id
};

Student_User.findAll = (result) => {
  sql.query("SELECT * FROM student_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log("student_users: ", res);
      result(null, res);
    }
  });
}

Student_User.findByUserId = (userid, result) => {
  sql.query(`SELECT * FROM student_user WHERE user_id = "${userid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else if (res.length) {
      console.log("found student_user: ", res[0]);
      result(null, res);
    }
    // not found student_user with the user_id
    else {result({ kind: "not_found" }, null);}
  });
};

Student_User.findByStuId = (stuid, result) => {
  sql.query(`SELECT * FROM student_user WHERE stu_id = "${stuid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.length) {
      console.log("found student_user: ", res[0]);
      result(null, res);
      return;
    }
    // not found student_user with the user_id
    else {result({ kind: "not_found" }, null);}
  });
};

module.exports = Student_User;