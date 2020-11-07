const Advisor_User = require("../models/advisor_user.model.js");
const Routes = require("../routes/courses.routes.js");

// Retrieve all Advisor_User from the database.
exports.find = (req, res) => {
    const userid = req.query.userid;
    const advid = req.query.advid;
    //if this is a GET ALL call 
    if(userid == null && advid == null)
        Advisor_User.findAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving advisor_users."
        });
        else res.send(data);
    });
    //if this is a GET by userId call
    else if(userid != null && advid == null)
        Advisor_User.findByUserId(userid, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving Advisor_User with User_Id " + userid
            });
        } else res.send(data);
    });
    //if this is a GET by advId call
    else
        Advisor_User.findByAdvId(advid, (err, data) => {
        if (err) {
            res.status(500).send({
              message: "Error retrieving Advisor_User with Adv_Id " + advid
            });
        } else res.send(data);
    });
};