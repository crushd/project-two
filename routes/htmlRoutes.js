var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      res.render("index", {
        msg: "Welcome to Event Creator!",
        examples: dbEvents
     
      });
    });
        
  

  });

  // Load example page and pass in an example by id
  app.get("/event/:id", function(req, res) {
    db.Event.findOne({ where: { id: req.params.id } }).then(function(dbEvents) {
      res.render("eventdetails", {
        event: dbEvents
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function(req, res) {
    db.Event.findOne({ where: { id: req.params.id } }).then(function(dbEvents) {
      res.render("userdetail", {
        event: dbEvents
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  


};
