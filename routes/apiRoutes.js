var db = require("../models");
var nodemailer = require('nodemailer');
//var emailTemp = require("../views/emailTemp.handlebars");

module.exports = function(app) {
  // Get all examples
  app.get("/api/events", function(req, res) {
    db.Event.findAll({
      include: [db.Invite]
    }).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Get event by eventId
  app.get("/api/event/:id", function(req, res) {
    db.Event.findOne({
      where: {id: req.params.id},
      include: [db.Invite]
    }).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new example
  app.post("/api/events", function(req, res) {
    db.Event.create(req.body).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new example
  app.get("/api/invites", function(req, res) {
    var query = {};
    
    db.Invite.findAll({
      include: [db.Event]
    }).then(function(dbInvites) {
      res.json(dbInvites);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function(req, res) {
    db.Event.destroy({ where: { id: req.params.id } }).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  app.get("/invite/:id", function(req, res) {
    
    db.Event.findOne({where: {id: req.params.id}}).then(function(dbEvents) {
      
      res.render("contact", {
        event:dbEvents
      });

    });

  });

  app.get("/invite/:id/:rsvp/:eid", function(req, res) {
    
    db.Invite.update({
      status: req.params.rsvp
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(rowsUpdated) {
      res.redirect("../../../event/"+req.params.eid);
    })
    
      
  });

  app.post("/invite/send", function(req, res) {

    db.Invite.create({email: req.body.email,EventId: req.body.eventId}).then(function(inviteEvent) {
      
    //console.log(inviteEvent)
    
    console.log(req.body);
    var output = `
      <p>You have been invited to the following event:</p>
        <ul>
          <li>Event: ${req.body.eventTitle}</li>
          <li>From: ${req.body.name}</li>
          <li>Start: ${req.body.eventStartDate}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone Number: ${req.body.phone}</li>
          <li>Message: ${req.body.message}</li>

          <li><a href="http://localhost:8080/event/${req.body.eventId}">View Event Details</a></li>
          <li><a href="https://server-spies.herokuapp.com/invite/${inviteEvent.id}/1/${req.body.eventId}">Yes, I will attend</a> | <a href="https://server-spies.herokuapp.com/invite/${inviteEvent.id}/0/${req.body.eventId}">No, I will not attend</a>
        </ul>
    `

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'eventcreator452@gmail.com',
               pass: 'UCSD123!'
           },
           tls:{
               rejectUnauthorized:false
           }
       });
    
    
       var mailOptions = {
        from: 'eventcreator452@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Email Invitation', // Subject line
        html: output// plain text body
      };
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    
          res.redirect("/event/"+req.body.eventId);

          // res.render('contact',{
          //   msg: `Email has been sent thank you!!`
          // });


     });

    });

  });
};
