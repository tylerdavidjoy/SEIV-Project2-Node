module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const prereq = require("../controllers/prereq.controller.js");
  
    // Create a new Course
    app.post("/courses", courses.create);

    // Create a new Prerequite
    app.post("/prereq", prereq.create);//working on
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);

    // Retrieve all Courses
    app.get("/prereq", prereq.findAll);
  
    // Retrieve a single Course with courseId
    app.get("/courses/id=:courseId", courses.findOne);
  
    // Update a Course with courseId
    app.put("/courses/:courseId", courses.update);
  
    // Delete a Course with courseId
    app.delete("/courses/:courseId", courses.delete);
  
    // // Delete all courses
    // app.delete("/courses", courses.deleteAll);
  };