const sql = require("./db.js");

// constructor
const Prereq = function(prereq) {
  this.course_id = prereq.course_id;
  this.prereq_id = prereq.prereq_id
};

Prereq.create = (newCourse, result) => {
  sql.query(`INSERT INTO courses.course_prereq VALUES( ${newCourse.course_id}, ${newCourse.prereq_id})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { course_id: res.insertId, ...newCourse });
    result(null, { course_id: res.insertId, ...newCourse });
  });
};

Prereq.findById = (courseId, result) => {
  sql.query(`SELECT * FROM course_prereq WHERE course_id = "${courseId}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res);//Changed from res[0] to res to allow the query to get all of the listings
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Prereq.getAll = result => {
  sql.query("SELECT * FROM course_prereq", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("prerequisites: ", res);
    result(null, res);
  });
};

Prereq.remove = (courseId, prereqId, result) => {
  sql.query(`DELETE FROM course_prereq WHERE course_id = ${courseId} AND prereq_id = ${prereqId}`, (err, res) => {
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

    console.log("deleted course with id: ", courseId);
    result(null, res);
  });
};

Prereq.removeById = (courseId, result) => {
  sql.query(`DELETE FROM course_prereq WHERE course_id = ${courseId}`, (err, res) => {
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

    console.log("deleted course with id: ", courseId);
    result(null, res);
  });
};

module.exports = Prereq;