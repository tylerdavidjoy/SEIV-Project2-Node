const sql = require("./db.js");

// constructor
const Advisor_User = function(advisor_user) {
  this.user_id = advisor_user.user_id;
  this.adv_id = advisor_user.adv_id
};

Advisor_User.findAll = (result) => {
  sql.query("SELECT * FROM advisor_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log("advisor_users: ", res);
      result(null, res);
    }
  });
}

Advisor_User.findByUserId = (userid, result) => {
  sql.query(`SELECT * FROM advisor_user WHERE user_id = "${userid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else if (res.length) {
      console.log("found advisor_user: ", res[0]);
      result(null, res);
    }
  });
};

Advisor_User.findByAdvId = (advid, result) => {
  sql.query(`SELECT * FROM advisor_user WHERE adv_id = "${advid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.length) {
      console.log("found advisor_user: ", res[0]);
      result(null, res);
      return;
    }
  });
};

module.exports = Advisor_User;