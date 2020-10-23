const Student = require("../models/student.model.js");
const Routes = require("../routes/courses.routes.js");

exports.find = (req, res) => {
    const stuid = req.query.stuid;
    if(stuid == null)
        Student.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving students."
                });
            else res.send(data);
        });
        // if this is a GET by Id call
    else if(stuid != null)
        Student.findById(userid, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving student."
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
    Student.updateById(
      req.query.stuid,
      new Student(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with id ${req.query.stuid}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id " + req.query.stuid
            });
          }
        } else res.send(data);
      }
    );
  };