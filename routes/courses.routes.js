module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
  
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
  
    // Create a new Course
    app.delete("/courses", courses.deleteAll);
  };