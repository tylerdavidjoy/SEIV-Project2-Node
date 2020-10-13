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

// Course.updateById = (id, course, result) => {
//   sql.query(
//     `UPDATE courses SET Course_id = "${course.Course_id}", Course_Number = "${course.Course_Number}", Course_Name = "${course.Course_Name}", Course_Professor_Full_Name = "${course.Course_Professor_Full_Name}", Course_Semester = "${course.Course_Semester}", Course_Credit = ${course.Course_Credit}, Course_Start_Time = '${course.Course_Start_Time}', Course_End_Time = '${course.Course_End_Time}', Course_Room = "${course.Course_Room}", Course_Description = "${course.Course_Description}", Course_Department = "${course.Course_Department}", Course_Level = ${course.Course_Level} WHERE Course_Number = "${id}"`,(err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Course with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated course: ", { id: id, ...course });
//       result(null, { id: id, ...course });
//     }
//   );
// };

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