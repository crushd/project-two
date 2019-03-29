var db = require("../models");
//var moment = require("moment");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/create", function(req, res) {
    db.Event.findAll().then(function(dbEvents) {
      res.render("addevent", {
        event: dbEvents
      });
    });
  });

  app.get("/events", function(req, res) {
    db.Event.findAll().then(function(dbEvents) {
      res.render("allevents", {
        event: dbEvents
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/event/:id", function(req, res) {

    // db.Event.findOne({ where: { id: req.params.id } }).then(function(dbEvents) {
    //   res.render("eventdetails", {
    //     event: dbEvents
    //   });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
