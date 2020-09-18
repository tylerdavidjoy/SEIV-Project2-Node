module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
  
    // Create a new Courses
    app.post("/courses", courses.create);
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);
  
    // Retrieve a single Courses with coursesId
    app.get("/courses/:coursesId", courses.findOne);
  
    // Update a Courses with coursesId
    app.put("/courses/:coursesId", courses.update);
  
    // Delete a Courses with coursesId
    app.delete("/courses/:coursesId", courses.delete);
  
    // Create a new Courses
    app.delete("/courses", courses.deleteAll);
  };