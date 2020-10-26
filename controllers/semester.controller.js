const Semester = require("../models/semester.model.js");
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
  const semester = new Semester({
    semester_id: req.body.semester_id,
    plan_id: req.body.plan_id,
    semester_type: req.body.semester_type,
    year: req.body.year,
  });

  // Save Semester in the database
  Semester.create(semester, (err, data) => {
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
    const id = req.query.id;
    const type = req.query.type;
    const year = req.query.year;
    const plan = req.query.plan;
    if(id == null && type == null && year == null && plan == null)
      Semester.getAll((err, data) => {
        if (err)
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving semesters."
        });
        else res.send(data);
      });
    else if(id != null)
      Semester.findById(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with Semester Id ${id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Semester with Semester Id " + id
            });
          }
        } else res.send(data);
      });
    else if(type != null)
      Semester.findByType(type, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with Semester Type ${type}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Semester with Semester Type " + type
            });
          }
        } else res.send(data);
      });
    else if(year != null)
      Semester.findByYear(year, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with Semester Year ${year}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Semester with Semester Year " + year
            });
          }
        } else res.send(data);
      });
    else
      Semester.findByPlanId(plan, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with Plan Id ${plan}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Semester with Plan Id " + plan
            });
          }
        } else res.send(data);
      });
  };

// Update a Course identified by the courseId in the request
exports.update = (req, res) => {
  const id = req.query.id;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Semester.update(
   id,
    new Semester(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Semester with Id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Semester with Id " + id
          });
        }
      } else res.send(data);
    }
  );
};