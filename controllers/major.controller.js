const Major = require("../models/major.model.js");
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
  const major = new Major({
    major_id: req.body.major_id,
    major_name: req.body.major_name,
    major_total_hrs: req.body.major_total_hrs,
  });

  // Save Course in the database
  Major.create(major, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database.
exports.find = (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    if(name == null && id == null)
      Major.getAll((err, data) => {
        if (err)
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving courses."
        });
        else res.send(data);
      });
    else if(name != null && id == null)
      Major.findByName(name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with Major Name ${name}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Major with Major Name " + name
            });
          }
        } else res.send(data);
      });
    else if(id != null)
      Major.findById(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with Major Id ${id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Major with Major Id " + id
            });
          }
        } else res.send(data);
      });
  };

// Update a Course identified by the courseId in the request
exports.update = (req, res) => {
  const name = req.query.name;
  const id = req.query.id;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if(id != null)
  Major.updateById(
    id,
     new Major(req.body),
     (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found Major with Id ${id}.`
           });
         } else {
           res.status(500).send({
             message: "Error updating Major with Id " + id
           });
         }
       } else res.send(data);
     }
   );
  else
  Major.updateByName(
   name,
    new Major(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Major with Name ${name}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Major with Name " + name
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
  const name = req.query.name;
    Major.remove(name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with name ${name}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Major with name " + name
            });
          }
        } else res.send({ message: `Major was deleted successfully!` });
      });
};