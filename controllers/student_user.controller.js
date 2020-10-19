const Student_User = require("../models/student_user.model.js");
const Routes = require("../routes/courses.routes.js");

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Prerequisite
  const student_user = new Student_User({
    user_id: req.body.user_id,
    stu_id: req.body.stu_id
  });

  // Save Course in the database
  Student_User.create(student_user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student_User."
      });
    else res.send(data);
  });
};

// Retrieve all Student_User from the database.
exports.find = (req, res) => {
    const userId = req.query.userid;
    const stuId = req.query.stuid;
    //if this is a GET ALL call 
    if(userid == null && stuid == null)
        Student_User.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving prerequisites."
        });
        else res.send(data);
    });
    //if this is a GET by userId call
    else if(userid != null && stuid == null)
        Student_User.findByUserId(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Student_User with User_Id ${userId}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Student_User with User_Id " + userId
            });
            }
        } else res.send(data);
    });
    //if this is a GET by stuId call
    else
        Student_User.findByStuId(stuId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student_User with Stu_Id ${stuId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Student_User with Stu_Id " + stuId
            });
          }
        } else res.send(data);
    });
};

// Delete a Student_User with the specified id in the request
exports.delete = (req, res) => {
    const userId = req.query.userid;
    const stuId = req.query.stuid;
    if(userId != null)
        Student_User.removeByUserId(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Student_User with user_id ${userId}`
            });
            } else {
            res.status(500).send({
                message: "Could not delete Student_User with user_id " + userId
            });
            }
        } else res.send({ message: `Student_User was deleted successfully!` });
        });
    else
        Student_User.removeByStuId(stuId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Student_User with stu_id ${stuId}`
            });
            } else {
            res.status(500).send({
                message: "Could not delete Student_User with id " + stuId
            });
            }
        } else res.send({ message: `Student_User was deleted successfully!` });
        });
};