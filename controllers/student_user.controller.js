const Student_User = require("../models/student_user.model.js");
const Routes = require("../routes/courses.routes.js");

// Retrieve all Student_User from the database.
exports.find = (req, res) => {
    const userid = req.query.userid;
    const stuid = req.query.stuid;
    //if this is a GET ALL call 
    if(userid == null && stuid == null)
        Student_User.findAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving prerequisites."
        });
        else res.send(data);
    });
    //if this is a GET by userId call
    else if(userid != null && stuid == null)
        Student_User.findByUserId(userid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Student_User with User_Id ${userid}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Student_User with User_Id " + userid
            });
            }
        } else res.send(data);
    });
    //if this is a GET by stuId call
    else
        Student_User.findByStuId(stuid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student_User with Stu_Id ${stuid}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Student_User with Stu_Id " + stuid
            });
          }
        } else res.send(data);
    });
};