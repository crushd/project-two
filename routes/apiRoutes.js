var db = require("../models");
var nodemailer = require('nodemailer');
var emailTemp = require("../views/emailTemp.handlebars");

module.exports = function (app) {
  // Get all examples
  app.get("/api/events", function (req, res) {
    db.Event.findAll({}).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new example
  app.post("/api/events", function (req, res) {
    db.Event.create(req.body).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function (req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  app.get("/invite/:id", function (req, res) {
      db.Event.findOne({  where: { id: req.params.id } }).then(function (dbEvents) {
        console.log(dbEvents)
        res.render("contact", {
          listevent: dbEvents

        });
      });
  });

  // app.get("/event/:id", function(req, res) {
  //   db.Event.findOne({ where: { id: req.params.id } }).then(function(dbEvents) {
  //     res.render("eventdetails", {
  //       event: dbEvents
  //     });
  //   });
  // });

app.post("/send", function (req, res) {
  console.log(req.body);
  var output = `
      <p>You have a new event invite</p>
        <ul>    
          <li>From: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone Number: ${req.body.phone}</li>
          <li>message: ${req.body.message}</li>

          <li>link: </li>

        
        </ul>
    
    
    `

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eventcreator452@gmail.com',
      pass: 'UCSD123!'
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  var mailOptions = {
    from: 'eventcreator452@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: output // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);

    res.render('contact', {
      msg: ` Email has been sent thankyou!!`

    });


  });
});
};