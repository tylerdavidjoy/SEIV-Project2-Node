const sql = require("./db.js");

// constructor
const Admin_User = function(admin_user) {
  this.user_id = admin_user.user_id;
  this.admin_id = admin_user.admin_id
};

Admin_User.findAll = (result) => {
  sql.query("SELECT * FROM admin_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      console.log("admin_users: ", res);
      result(null, res);
    }
  });
}

Admin_User.findByUserId = (userid, result) => {
  sql.query(`SELECT * FROM admin_user WHERE user_id = "${userid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else if (res.length) {
      console.log("found admin_user: ", res[0]);
      result(null, res);
    }
  });
};

Admin_User.findByAdminId = (adminid, result) => {
  sql.query(`SELECT * FROM admin_user WHERE admin_id = "${adminid}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.length) {
      console.log("found admin_user: ", res[0]);
      result(null, res);
      return;
    }
  });
};

module.exports = Admin_User;