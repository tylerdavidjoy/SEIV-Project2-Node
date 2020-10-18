const User = require("../models/user.model.js");
const Routes = require("../routes/courses.routes.js");

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const user = new User({
    //attributes
  })

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
}

exports.find = (req, res) => {
  // const courseId = req.query.courseid;
  const userid = req.query.userid;
  const email = req.query.email;
  // if this is a GET ALL call
  if(userid == null && email == null)
    User.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  // if this is a GET by Id call
  else if(userid != null)
    User.findById(userId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user."
          });
        else res.send(data);
    });
  // if this is a get by email call
  else 
    User.findByEmail(email, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      else res.send(data);
    });
};