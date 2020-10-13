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
  //else{
    Prereq.getAll((err, data) => {
      if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving prerequisites."
      });
      else res.send(data);
    });
  };
//}
  
// Find a single Course with a courseId
exports.findOne = (req, res) => {
    Prereq.findById(req.params.courseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with Course_Id ${req.params.courseId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Course with Course_Id " + req.params.courseId
            });
          }
        } else res.send(data);
      });
};

// // Update a Course identified by the courseId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   Course.updateById(
//     req.params.courseId,
//     new Course(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Course with id ${req.params.courseId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Course with id " + req.params.courseId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
    Prereq.remove(req.params.courseId, req.params.prereqId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.params.courseId} or Prereq with id ${req.params.prereqId}`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Course with id " + req.params.courseId + " or Prereq with id " + req.params.prereqId
            });
          }
        } else res.send({ message: `Course was deleted successfully!` });
      });
};

//Delete all the prereq of a courseId
exports.deleteAllById = (req, res) => {
  Prereq.removeById(req.params.courseId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.courseId}`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + req.params.courseId
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
};

// // Delete all Courses from the database.
// exports.deleteAll = (req, res) => {
//     Course.removeAll((err, data) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all courses."
//           });
//         else res.send({ message: `All Courses were deleted successfully!` });
//       });
// };