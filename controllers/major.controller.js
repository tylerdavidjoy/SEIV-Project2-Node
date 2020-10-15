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
exports.findAll = (req, res) => {
  // const sort = req.query.sort;
  // const order = req.query.order;
  // // filterType determines what attribute we are filtering by
  // const filterType = req.query.filterType;
  // // filterBy determines what value we are looking for in said attribute
  // const filterBy = req.query.filterBy;
  // //Get all courses sorted my course name A-Z
  // if(sort == "course" && order == "forwards")
  // {
  //   Course.sortByCourseNameForwards((err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // //Get all courses sorted my course name Z-A
  // else if(sort == "course" && order == "backwards")
  // {
  //   Course.sortByCourseNameBackwards((err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // //Get all courses sorted my professor name
  // else if (sort == "prof")
  // {
  //   Course.sortByProfName((err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // //Get all courses sorted by course number
  // else if (sort == "number")
  // {
  //   Course.sortByCourseNumber((err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // else if (filterType == "dept")
  // {
  //   Course.filterByDepartment(filterBy, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // else if (filterType == "name")
  // {
  //   Course.filterByCourseName(filterBy, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // else if (filterType == "prof")
  // {
  //   Course.filterByProfessor(filterBy, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving courses."
  //       });
  //     else res.send(data);
  //   });
  // }
  // else{
    Major.getAll((err, data) => {
      if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving courses."
      });
      else res.send(data);
    });
  };
//}
  
// Find a single Course with a courseId
exports.findOne = (req, res) => {
    Major.findByName(req.params.major_name, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with Major Name ${req.params.major_name}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Major with Major Name " + req.params.major_name
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

  Major.updateByName(
    req.params.majorName,
    new Major(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Major with Name ${req.params.majorName}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Major with Name " + req.params.majorName
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
    Major.remove(req.params.majorName, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Major with name ${req.params.majorName}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Major with name " + req.params.majorName
            });
          }
        } else res.send({ message: `Major was deleted successfully!` });
      });
};