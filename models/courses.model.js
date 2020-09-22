const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.Course_Number = course.Course_Number;
  this.Course_Name = course.Course_Name;
  this.Course_Professor_Full_Name = course.Course_Professor_Full_Name;
  this.Course_Semester = course.Course_Semester;
  this.Course_Credit = course.Course_Credit;
  this.Course_Start_Time = course.Course_Start_Time;
  this.Course_End_Time = course.Course_End_Time;
  this.Course_Room = course.Course_Room;
  this.Course_Description = course.Course_Description;
  this.Course_Department = course.Course_Department;
  this.Course_Level = course.Course_Level;
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.findById = (courseId, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Number = "${courseId}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course.getAll = result => {
  sql.query("SELECT * FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("courses: ", res);
    result(null, res);
  });
};

Course.updateById = (id, course, result) => {
  sql.query(
    "UPDATE courses SET email = ?, name = ?, active = ? WHERE id = ?",
    [course.email, course.name, course.active, id],
    (err, res) => {
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

      console.log("updated course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query(`DELETE FROM courses WHERE courses.Course_Number = "${Id}"`, (err, res) => {
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

    console.log("deleted course with id: ", id);
    result(null, res);
  });
};

Course.removeAll = result => {
  sql.query("DELETE FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} courses`);
    result(null, res);
  });
};

module.exports = Course;