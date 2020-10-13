module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const prereq = require("../controllers/prereq.controller.js");
  
    // Create a new Course
    app.post("/courses", courses.create);

    // Create a new Prerequite
    app.post("/prereq", prereq.create);//Ready to Test
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);

    // Retrieve all Prerequisites
    app.get("/prereq", prereq.findAll);//Ready to Test
  
    // Retrieve a single Course with courseId
    app.get("/courses/id=:courseId", courses.findOne);

    // Retrieve all Prerequisites of a single Course with courseId
    app.get("/prereq/id=:courseId", prereq.findOne);//Ready to Test
  
    // Update a Course with courseId
    app.put("/courses/:courseId", courses.update);
  
    // Delete a Course with courseId
    app.delete("/courses/:courseId", courses.delete);

    // Delete a Prerequisite of a Course with courseId and prereqId
    app.delete("/prereq/courseid=:courseId/prereqid=:prereqId", prereq.delete);//Ready to Test
  
    // Delete all Prereq of a courseId
    app.delete("/prereq/id=:courseId", prereq.deleteAllById);//Ready to Test
  };