const Course_Major = require("../models/courses_major.model.js");
const coursesRoutes = require("../routes/courses.routes.js");

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Course
  const course_major = new Course_Major({
    courses_id: req.body.courses_id,
    major_id: req.body.major_id
  });

  // Save Course_Major in the database
  Course_Major.create(course_major, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Courses or a specific Course for a given Major from the database.
exports.find = (req, res) => {
    const majorid = req.query.major;
    const courseid = req.query.course;
    if(courseid == null)
      Course_Major.findAllForMajor(majorid, (err, data) => {
        if (err)
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving courses."
        });
        else res.send(data);
      });
    else
      Course_Major.findById(majorid, courseid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course for Major of Major id ${majorid}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Course for Major of Major id " + majorid
            });
          }
        } else res.send(data);
      });
  };

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
  const majorid = req.query.major;
  const courseid = req.query.course;
  if(courseid == null)
      Course_Major.removeAll(majorid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with ID ${majorid}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Major with ID " + majorid
            });
          }
        } else res.send({ message: `Major was deleted successfully!` });
      });
  else
      
      Course_Major.removeId(majorid, courseid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with ID ${courseid} for Major with ID ${majorid}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Course with Id " + courseid + " for Major with ID " + majorid
            });
          }
        } else res.send({ message: `Course of Major was deleted successfully!` });
      });
};