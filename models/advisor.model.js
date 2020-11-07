const sql = require("./db.js");

// constructor
const Advisor = function(advisor) {
    this.adv_id = advisor.adv_id;
    this.adv_name = advisor.adv_name;
};

Advisor.findAll = (result) => {
    sql.query("SELECT * FROM advisor", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("advisors: ", res);
        result(null, res);
      });
};

Advisor.findById = (advid, result) => {
    sql.query(`SELECT * FROM advisor WHERE advisor.adv_id = "${advid}"`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found advisor: ", res[0]);
          result(null, res[0]);
          return;
        }
    });
};

Advisor.updateById = (advid, adv, result) => {
    sql.query(
        `UPDATE advisor SET adv_name = "${adv.adv_name}" WHERE adv_id = ${advid}`,(err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          console.log("updated advisor: ", adv);
          result(null, adv);
        }
      );
};

module.exports = Advisor;