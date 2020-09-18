module.exports = app => {
    const courses = require("../controllers/course.controller.js");
  
    // Create a new Course
    app.post("/courses", courses.create);
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);
  
    // Retrieve a single Course with customerId
    app.get("/courses/:customerId", courses.findOne);
  
    // Update a Course with customerId
    app.put("/courses/:customerId", courses.update);
  
    // Delete a Course with customerId
    app.delete("/courses/:customerId", courses.delete);
  
    // Create a new Course
    app.delete("/courses", courses.deleteAll);
  };