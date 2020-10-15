const sql = require("./db.js");

// constructor
const Major = function(major) {
  this.major_id = major.major_id;
  this.major_name = major.major_name;
  this.major_total_hrs = major.major_total_hrs;
};

Major.create = (newMajor, result) => {
  sql.query(`INSERT INTO major VALUES( ${newMajor.major_id},"${newMajor.major_name}", ${newMajor.major_total_hrs})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Major: ", { major_name: res.insertId, ...newMajor });
    result(null, { major_id: res.insertId, ...newMajor });
  });
};

Major.findByName = (majorName, result) => {
  sql.query(`SELECT * FROM major WHERE  major.major_name= "${majorName.major_name}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found major: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Major.getAll = result => {
  sql.query("SELECT * FROM major", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Major: ", res);
    result(null, res);
  });
};

// Course.sortByCourseNameForwards = result => {
//   sql.query("SELECT * FROM courses ORDER BY courses.Course_Name", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.sortByCourseNameBackwards = result => {
//   sql.query("SELECT * FROM courses ORDER BY courses.Course_Name DESC", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.sortByProfName = result => {
//   sql.query("SELECT * FROM courses ORDER BY courses.Course_Professor_Full_Name", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.sortByCourseNumber = result => {
//   sql.query("SELECT * FROM courses ORDER BY courses.Course_Number", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.filterByDepartment = (filterBy, result) => {
//   sql.query(`SELECT * FROM courses WHERE courses.Course_Department = "${filterBy}"`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.filterByCourseName = (filterBy, result) => {
//   sql.query(`SELECT * FROM courses WHERE courses.Course_Name = "${filterBy.trim()}"`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

// Course.filterByProfessor = (filterBy, result) => {
//   sql.query(`SELECT * FROM courses WHERE courses.Course_Professor_Full_Name = "${filterBy.trim()}"`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("courses: ", res);
//     result(null, res);
//   });
// };

Major.updateById = (id, course, result) => {
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

Major.remove = (id, result) => {
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

module.exports = Major;