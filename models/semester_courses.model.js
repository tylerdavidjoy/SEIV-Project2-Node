const sql = require("./db.js");

// constructor
const Semester_Course = function(semester_course) {
  this.semester_id = semester_course.semester_id;
  this.course_id = semester_course.course_id;
  this.grade = semester_course.grade;
};

Semester_Course.create = (newSemester, result) => {
  sql.query(`INSERT INTO semester_courses VALUES( ${newSemester.semester_id}, ${newSemester.course_id}, '${newSemester.grade}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Semester: ", { semester_id: res.insertId, ...newSemester });
    result(null, { semester_id: res.insertId, ...newSemester });
  });
};
Semester_Course.findByCourse = (semester,course, result) => {
  sql.query(`SELECT * FROM courses.semester_courses WHERE semester_id = "${semester}" AND course_id = "${course}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found semester: ", res);
      result(null, res);
      return;
    }

    // not found Semester of type
    result({ kind: "not_found" }, null);
  });
};

Semester_Course.getAll = (semester,result) => {
  sql.query(`SELECT * FROM semester_courses WHERE semester_id = "${semester}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Semester: ", res);
    result(null, res);
  });
};

Semester_Course.removeAll = (semester, result) => {
  sql.query(`DELETE FROM semester_courses WHERE semester_id = "${semester}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted semester with id: ", semester);
    result(null, res);
  });
};

Semester_Course.removeCourse = (semester,course, result) => {
  sql.query(`DELETE FROM semester_courses WHERE semester_id = "${semester}" AND course_id = "${course}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", course);
    result(null, res);
  });
};
module.exports = Semester_Course;