const Semester_Course = require("../models/semester_courses.model.js");
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
  const semester_course = new Semester_Course({
    semester_id: req.body.semester_id,
    course_id: req.body.course_id,
    grade:req.body.grade
  });

  // Save Semester in the database
  Semester_Course.create(semester_course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Semester."
      });
    else res.send(data);
  });
};

// Retrieve Semesters from the database. Will search by either id, type, or grade for the 
exports.find = (req, res) => {
    const semester = req.query.semester;
    const course = req.query.course;
    if(course == null)
      Semester_Course.getAll(semester,(err, data) => {
        if (err)
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving courses for semester."
        });
        else res.send(data);
      });
    else
      Semester_Course.findByCourse(semester,course, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with Course Id ${course}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Course with Course Id " + course
            });
          }
        } else res.send(data);
      });
  };

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
  const semester = req.query.semester;
  const course = req.query.course;
  if(course == null)
    Semester_Course.removeAll(semester, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with id ${semester}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Semester with id " + semester
            });
          }
        } else res.send({ message: `Semester was deleted successfully!` });
      });
  else
    Semester_Course.removeCourse(semester, course, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${course}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + course
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
};