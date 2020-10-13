const sql = require("./db.js");

// constructor
const User = function(user) {
  //this.course_id = prereq.course_id;
  //this.prereq_id = prereq.prereq_id
};

User.create = (newUser, result) => {
  /*sql.query(`INSERT INTO courses.course_prereq VALUES( ${newCourse.course_id}, ${newCourse.prereq_id})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { course_id: res.insertId, ...newCourse });
    result(null, { course_id: res.insertId, ...newCourse });
  });*/
};


module.exports = User;