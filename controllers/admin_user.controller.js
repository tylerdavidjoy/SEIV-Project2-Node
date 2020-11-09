const Admin_User = require("../models/admin_user.model.js");
const Routes = require("../routes/courses.routes.js");

// Retrieve all Admin_User from the database.
exports.find = (req, res) => {
    const userid = req.query.userid;
    const adminid = req.query.adminid;
    //if this is a GET ALL call 
    if(userid == null && adminid == null)
        Admin_User.findAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving admin_users."
        });
        else res.send(data);
    });
    //if this is a GET by userId call
    else if(userid != null && adminid == null)
        Admin_User.findByUserId(userid, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving Admin_User with User_Id " + userid
            });
        } else res.send(data);
    });
    //if this is a GET by adminId call
    else
        Admin_User.findByAdminId(adminid, (err, data) => {
        if (err) {
            res.status(500).send({
              message: "Error retrieving Admin_User with Admin_Id " + adminid
            });
        } else res.send(data);
    });
};