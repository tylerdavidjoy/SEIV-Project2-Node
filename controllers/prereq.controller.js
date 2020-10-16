const Prereq = require("../models/prereq.model.js");
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
  const prereq = new Prereq({
    course_id: req.body.course_id,
    prereq_id: req.body.prereq_id
  });

  // Save Course in the database
  Prereq.create(prereq, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Prereq from the database.
exports.find = (req, res) => {
  const courseId = req.query.courseid;
  //if this is a GET ALL call
  if(courseId == null)
    Prereq.getAll((err, data) => {
      if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving prerequisites."
      });
      else res.send(data);
    });
  //if this is a GET by Id call
  else
    Prereq.findById(courseId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with Course_Id ${courseId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Course with Course_Id " + courseId
          });
        }
      } else res.send(data);
    });
};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
  const courseId = req.query.courseid;
  const prereqId = req.query.prereqid;
  if(prereqId == null)
    Prereq.removeById(courseId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${courseId}`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + courseId
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
  else
    Prereq.remove(courseId, prereqId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${courseId} or Prereq with id ${prereqId}`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + courseId + " or Prereq with id " + prereqId
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
};