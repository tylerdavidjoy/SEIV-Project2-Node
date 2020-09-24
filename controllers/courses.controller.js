const Course = require("../models/courses.model.js");
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
  const course = new Course({
    Course_Number: req.body.Course_Number,
    Course_Name: req.body.Course_Name,
    Course_Professor_Full_Name: req.body.Course_Professor_Full_Name,
    Course_Semester: req.body.Course_Semester,
    Course_Credit: req.body.Course_Credit,
    Course_Start_Time: req.body.Course_Start_Time,
    Course_End_Time: req.body.Course_End_Time,
    Course_Room: req.body.Course_Room,
    Course_Description: req.body.Course_Description,
    Course_Department: req.body.Course_Department,
    Course_Level: req.body.Course_Level
  });

  // Save Course in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  const sort = req.query.sort;
  const order = req.query.order;
  if(sort == "course" && order == "forwards")
  {
    Course.sortByCourseNameForwards((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      else res.send(data);
    });
  }else{

    Course.getAll((err, data) => {
      if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving courses."
      });
      else res.send(data);
    });
  };
}
  
// Find a single Course with a courseId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with Course_Number ${req.params.courseId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Course with Course_Number " + req.params.courseId
            });
          }
        } else res.send(data);
      });
};

// Update a Course identified by the courseId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Course.updateById(
    req.params.courseId,
    new Course(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.courseId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Course with id " + req.params.courseId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
    Course.remove(req.params.courseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.params.courseId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Course with id " + req.params.courseId
            });
          }
        } else res.send({ message: `Course was deleted successfully!` });
      });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Course.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all courses."
          });
        else res.send({ message: `All Courses were deleted successfully!` });
      });
};