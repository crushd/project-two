var db = require("../models");
var moment = require("moment");

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

  // // Load example page and pass in an example by id
  // app.get("/edit/:id", function(req, res) {

  //     res.render("editevent");

  // });

  app.get("/edit/:id", function(req, res) {
    db.Event.findOne({
      where: { id: req.params.id },
      include: [db.Invite]
    }).then(function(dbEvents) {
      //console.log(dbEvents.Invites[0]);

      res.render("editevent", { event: dbEvents });
    });
  });

  // Load example page and pass in an example by id
  app.get("/event/:id", function(req, res) {
    // console.log(req.body);

    db.Event.findOne({
      where: { id: req.params.id },
      include: [db.Invite]
    }).then(function(dbEvents) {
      //console.log(dbEvents.Invites[0]);
      console.log(dbEvents.Invites);

      thisid = dbEvents.id;
      thistitle = dbEvents.title;
      thisstartdate = moment(dbEvents.startdate).format(
        "ddd, MM/DD/YYYY h:mm a"
      );
      thisenddate = moment(dbEvents.enddate).format("ddd, MM/DD/YYYY h:mm a");
      thisrsvpdate = moment(dbEvents.rsvpdate).format("ddd, MM/DD/YYYY h:mm a");
      thisdescription = dbEvents.description;
      thisguestlist = dbEvents.Invites;

      res.render("eventdetails", {
        eventID: thisid,
        eventTitle: thistitle,
        eventCategory: dbEvents.category,
        eventStartDate: thisstartdate,
        eventEndDate: thisenddate,
        eventRsvpDate: thisrsvpdate,
        eventDescription: thisdescription,
        eventGuestList: thisguestlist
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
