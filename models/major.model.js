const sql = require("./db.js");

// constructor
const Major = function(major) {
  this.major_id = major.major_id;
  this.major_name = major.major_name;
  this.major_total_hrs = major.major_total_hrs;
};

Major.create = (newMajor, result) => {
  sql.query(`INSERT INTO major VALUES( "","${newMajor.major_name}", ${newMajor.major_total_hrs})`, (err, res) => {
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
      console.log("found major: ", res);
      result(null, res);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Major.findById = (majorId, result) => {
  sql.query(`SELECT * FROM courses.major WHERE major.major_id = "${majorId}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
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

Major.updateByName = (Name, major, result) => {
  sql.query(
    `UPDATE major SET major_name = "${major.major_name}", major_total_hrs = ${major.major_total_hrs} WHERE major_name = "${Name}"`,(err, res) => {
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

Major.updateById = (id, major, result) => {
  sql.query(
    `UPDATE major SET major_name = "${major.major_name}", major_total_hrs = ${major.major_total_hrs} WHERE major_id = "${id}"`,(err, res) => {
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

      console.log("updated major: ", { id: id, ...major });
      result(null, { id: id, ...major });
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