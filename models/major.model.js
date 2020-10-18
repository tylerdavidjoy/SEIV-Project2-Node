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
//${majorName.major_name}
Major.findByName = (majorName, result) => {
  sql.query(`SELECT * FROM courses.major WHERE major.major_name = "${majorName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log(majorName);
      console.log("found major: ", res);
      result(null, res);
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

Major.updateByName = (Name, major, result) => {
  sql.query(
    `UPDATE major SET major_id = ${major.major_id}, major_name = "${major.major_name}", major_total_hrs = ${major.major_total_hrs} WHERE major_name = "${Name}"`,(err, res) => {
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

      console.log("updated major: ", { Name: Name, ...major });
      result(null, { Name: Name, ...major });
    }
  );
};

Major.remove = (name, result) => {
  sql.query(`DELETE FROM major WHERE major_name = "${name.trim()}"`, (err, res) => {
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

    console.log("deleted major with name: ", name);
    result(null, res);
  });
};

module.exports = Major;