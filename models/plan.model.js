const sql = require("./db.js");

const Plan = function(plan) {
    this.plan_id = plan.plan_id;
    this.stu_id = plan.stu_id;
};

Plan.findAll = (result) => {
    sql.query("SELECT * FROM plan", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("plans: ", res);
        result(null, res);
      });
};

Plan.findById = (planid, result) => {
    sql.query(`SELECT * FROM plan WHERE plan.plan_id = "${planid}"`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found plan: ", res[0]);
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
    });
};

Plan.findByStudent = (stuid, result) => {
    sql.query(`SELECT * FROM plan WHERE plan.stu_id = "${stuid}"`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found plan: ", res[0]);
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Plan;