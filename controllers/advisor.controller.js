const Advisor = require("../models/advisor.model.js");
const Routes = require("../routes/courses.routes.js");

exports.find = (req, res) => {
    const advid = req.query.advid;
    if(advid == null)
        Advisor.findAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving advisors."
                });
            else res.send(data);
        });
        // if this is a GET by Id call
    else if(advid != null)
        Advisor.findById(advid, (err, data) => {
          if (err)
          {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving advisor."
            });
          }
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
    Advisor.updateById(
      req.query.advid,
      new Advisor(req.body),
      (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating advisor with id " + req.query.advid
            });
        } else res.send(data);
      }
    );
};