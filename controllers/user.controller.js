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
    user_role: req.body.user_role,
    user_email: req.body.user_email
  });
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
    User.findById(userid, (err, data) => {
        if (err)
        {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user."
          });
        }
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

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.query.userid,
    new User(req.body),
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: "Error updating User with id " + req.query.userid
        });
      } else res.send(data);
    }
  );
};

exports.delete = (req,res) => {
  const userid = req.query.userid;
  
  User.remove(userid, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete User with id " + userid
      });
    } else res.send({ message: `User was deleted successfully!` });
  });
};