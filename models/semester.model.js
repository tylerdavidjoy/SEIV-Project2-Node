const sql = require("./db.js");

// constructor
const Semester = function(semester) {
  this.semester_id = semester.semester_id;
  this.plan_id = semester.plan_id;
  this.semester_type = semester.semester_type;
  this.year = semester.year;
};

Semester.create = (newSemester, result) => {
  sql.query(`INSERT INTO semester VALUES( ${newSemester.semester_id}, ${newSemester.plan_id},"${newSemester.semester_type}", "${newSemester.year}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Semester: ", { semester_id: res.insertId, ...newSemester });
    result(null, { semester_id: res.insertId, ...newSemester });
  });
};
Semester.findByType = (type, result) => {
  sql.query(`SELECT * FROM courses.semester WHERE semester_type = "${type}"`, (err, res) => {
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

Semester.findByYear = (year, result) => {
  sql.query(`SELECT * FROM courses.semester WHERE year = "${year}"`, (err, res) => {
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

    // not found Semester with year
    result({ kind: "not_found" }, null);
  });
};

Semester.findByPlanId = (planid, result) => {
  sql.query(`SELECT * FROM courses.semester WHERE plan_id = "${planid}"`, (err, res) => {
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

    // not found Semester with plan id
    result({ kind: "not_found" }, null);
  });
};

Semester.findById = (id, result) => {
  sql.query(`SELECT * FROM courses.semester WHERE semester_id = "${id}"`, (err, res) => {
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

    // not found Semester with plan id
    result({ kind: "not_found" }, null);
  });
};

Semester.getAll = result => {
  sql.query("SELECT * FROM semester", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Semester: ", res);
    result(null, res);
  });
};

Semester.update = (id, semester, result) => {
  sql.query(
    `UPDATE semester SET semester_type = "${semester.semester_type}", year = "${semester.year}" WHERE semester_id = "${id}"`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Semester with Name
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated semester: ", { id: id, ...semester });
      result(null, { id: id, ...semester });
    }
  );
};

module.exports = Semester;