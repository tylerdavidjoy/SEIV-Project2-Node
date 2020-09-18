const Courses = require("../models/courses.model.js");

// Create and Save a new Courses
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Courses
  const courses = new Courses({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Courses in the database
  Courses.create(courses, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Courses."
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    Courses.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Coursess."
          });
        else res.send(data);
      });
};

// Find a single Courses with a CoursesId
exports.findOne = (req, res) => {
    Courses.findById(req.params.coursesId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Courses with id ${req.params.coursesId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Courses with id " + req.params.coursesId
            });
          }
        } else res.send(data);
      });
};

// Update a Courses identified by the coursesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Courses.updateById(
    req.params.coursesId,
    new Courses(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Courses with id ${req.params.coursesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Courses with id " + req.params.coursesId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Courses with the specified coursesId in the request
exports.delete = (req, res) => {
    Courses.remove(req.params.coursesId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Courses with id ${req.params.coursesId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Courses with id " + req.params.coursesId
            });
          }
        } else res.send({ message: `Courses was deleted successfully!` });
      });
};

// Delete all Coursess from the database.
exports.deleteAll = (req, res) => {
    Courses.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all coursess."
          });
        else res.send({ message: `All Coursess were deleted successfully!` });
      });
};