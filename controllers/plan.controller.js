const Plan = require("../models/plan.model.js");
const Routes = require("../routes/courses.routes.js");

exports.find = (req, res) => {
    const planid = req.query.planid;
    const stuid = req.query.stuid;
    // if this is a GET ALL call
    if(planid == null && stuid == null)
      Plan.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving plans."
          });
        else res.send(data);
      });
    // if this is a GET by Id call
    else if(planid != null)
      Plan.findById(planid, (err, data) => {
          if (err)
          {
            if (err.kind === "not_found")
            {
              res.status(404).send({
                message: `Not found plan with plan_id ${planid}.`
            });
            }else {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving plan."
              });
            }
          }
          else res.send(data);
      });
    // if this is a get by student call
    else 
      Plan.findByStudent(stuid, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving plan."
          });
        else res.send(data);
      });
  };