module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const prereq = require("../controllers/prereq.controller.js");
    const major = require("../controllers/major.controller.js");

  
    // Create a new Course
    app.post("/courses", courses.create);
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);
  
    // Retrieve a single Course with courseId
    app.get("/courses/id=:courseId", courses.findOne);
  
    // Update a Course with courseId
    app.put("/courses/:courseId", courses.update);
  
    // Delete a Course with courseId
    app.delete("/courses/:courseId", courses.delete);

    //Prereq Table API

    // Create a new Prerequite
    app.post("/prereq", prereq.create);//Ready to Test

    // Retrieve all Prerequisites
    app.get("/prereq", prereq.findAll);//Ready to Test

    // Retrieve all Prerequisites of a single Course with courseId
    app.get("/prereq/id=:courseId", prereq.findOne);//Ready to Test

    // Delete a Prerequisite of a Course with courseId and prereqId
    app.delete("/prereq/courseid=:courseId/prereqid=:prereqId", prereq.delete);//Ready to Test
  
    // Delete all Prereq of a courseId
    app.delete("/prereq/id=:courseId", prereq.deleteAllById);//Ready to Test

    //Major Table API

    // Create a new Major
    app.post("/major", major.create);//Ready to Test

    // Retrieve all Majors or a Major by name
    app.get("/major", major.find);//Ready to Test

    // Update a Course with courseId
    app.put("/major", major.update);//Ready to Test

    // Delete a Major with majorName
    app.delete("/major", major.delete);//Ready to Test
  };