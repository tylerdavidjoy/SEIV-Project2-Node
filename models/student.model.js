const sql = require("./db.js");

// constructor
const Student = function(student) {
    this.stu_id = student.stu_id;
    this.major_id = student.major_id;
    this.plan_id = student.plan_id;
    this.adv_id = student.adv_id;
    this.stu_gpa = student.stu_gpa;
    this.stu_name = student.stu_name;
    this.stu_hrs_taken = student.stu_hrs_taken;
    this.stu_grad_date = student.stu_grad_date;
    this.stu_hrs_not_taken = student.stu_hrs_not_taken;
    this.stu_classification = student.stu_classification;
    this.stu_hrs_enrolled = student.stu_hrs_enrolled;
};

Student.findAll = (result) => {
    sql.query("SELECT * FROM student", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("students: ", res);
        result(null, res);
      });
};

Student.findById = (stuid, result) => {
    sql.query(`SELECT * FROM student WHERE student.stu_id = "${stuid}"`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found student: ", res[0]);
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
    });
};

Student.updateById = (stuid, stu, result) => {
    sql.query(
        `UPDATE student SET major_id = "${stu.major_id}", adv_id = "${stu.adv_id}, stu_name = "${stu.stu_name}", 
        stu_grad_date = "${stu.stu_grad_date}", stu_classification = "${stu.stu_classification}"
        WHERE stu_id = ${stuid}`,(err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated student: ", stu);
          result(null, stu);
        }
      );
};

module.exports = Student;