const sql = require("./db.js");

// constructor
const Course_Major = function(course_major) {
  this.courses_id = course_major.courses_id;
  this.major_id = course_major.major_id;
};

Course_Major.create = (newMajor, result) => {
  sql.query(`INSERT INTO courses_major VALUES(${newMajor.courses_id},${newMajor.major_id})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Major: ", { major_id: res.insertId, ...newMajor });
    result(null, { major_id: res.insertId, ...newMajor });
  });
};
Course_Major.findById = (majorid, courseid, result) => {
  sql.query(`SELECT * FROM courses.courses_major WHERE courses_id = ${courseid} AND major_id = ${majorid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course for major: ", res);
      result(null, res);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course_Major.findAllForMajor = (majorid, result) => {
  sql.query(`SELECT * FROM courses.courses_major WHERE major_id = ${majorid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found all courses for major: ", res);
      result(null, res);
      return;
    }

    //Major is not found
    result({ kind: "not_found" }, null);
  });
};

Course_Major.removeId = (majorid, courseid, result) => {
  sql.query(`DELETE FROM courses_major WHERE major_id = ${majorid} AND courses_id = ${courseid}`, (err, res) => {
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

    console.log("deleted course with ID: ", courseid);
    result(null, res);
  });
};

Course_Major.removeAll = (majorid, result) => {
  sql.query(`DELETE FROM courses_major WHERE major_id = ${majorid}`, (err, res) => {
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

    console.log("deleted major with ID: ", majorid);
    result(null, res);
  });
};

module.exports = Course_Major;