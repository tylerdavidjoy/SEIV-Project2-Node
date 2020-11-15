const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.Course_Id = course.Course_Id;
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
  sql.query(`INSERT INTO courses.courses VALUES( "","${newCourse.Course_Number}", "${newCourse.Course_Name}", "${newCourse.Course_Professor_Full_Name}", "${newCourse.Course_Semester}", ${newCourse.Course_Credit}, '${newCourse.Course_Start_Time}', '${newCourse.Course_End_Time}', "${newCourse.Course_Room}", "${newCourse.Course_Description}", "${newCourse.Course_Department}", ${newCourse.Course_Level})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { Course_Number: res.insertId, ...newCourse });
    result(null, { Course_Number: res.insertId, ...newCourse });
  });
};

Course.findById = (courseId, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Id = "${courseId}"`, (err, res) => {
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

Course.findByNumber = (courseNumber, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Number = "${courseNumber}"`, (err, res) => {
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

Course.sortByCourseNameForwards = result => {
  sql.query("SELECT * FROM courses ORDER BY courses.Course_Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.sortByCourseNameBackwards = result => {
  sql.query("SELECT * FROM courses ORDER BY courses.Course_Name DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.sortByProfName = result => {
  sql.query("SELECT * FROM courses ORDER BY courses.Course_Professor_Full_Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.sortByCourseNumber = result => {
  sql.query("SELECT * FROM courses ORDER BY courses.Course_Number", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.filterByDepartment = (filterBy, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Department = "${filterBy}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.filterByCourseName = (filterBy, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Name = "${filterBy.trim()}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("courses: ", res);
    result(null, res);
  });
};

Course.filterByProfessor = (filterBy, result) => {
  sql.query(`SELECT * FROM courses WHERE courses.Course_Professor_Full_Name = "${filterBy.trim()}"`, (err, res) => {
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
    `UPDATE courses SET Course_id = "${course.Course_id}", Course_Number = "${course.Course_Number}", Course_Name = "${course.Course_Name}", Course_Professor_Full_Name = "${course.Course_Professor_Full_Name}", Course_Semester = "${course.Course_Semester}", Course_Credit = ${course.Course_Credit}, Course_Start_Time = '${course.Course_Start_Time}', Course_End_Time = '${course.Course_End_Time}', Course_Room = "${course.Course_Room}", Course_Description = "${course.Course_Description}", Course_Department = "${course.Course_Department}", Course_Level = ${course.Course_Level} WHERE Course_Number = "${id}"`,(err, res) => {
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
  sql.query(`DELETE FROM courses WHERE Course_Number = "${id.trim()}"`, (err, res) => {
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

module.exports = Course;