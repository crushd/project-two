

// var moment = require("moment");
// let startdate_value = new Date().toISOString().substr(0, 10);
// document.querySelector("#event-startdate").value = startdate_value;
// console.log(startdate_value);
var sd_date = moment().format("YYYY-MM-DD");
var sd_time = "20:00";
var ed_time = "22:00";

var thisStartDate = moment(sd_date+' '+sd_time).format("YYYY-MM-DDThh:mm");
var thisEndDate = moment(sd_date+' '+ed_time).format("YYYY-MM-DDThh:mm");
var thisRSVPDate = moment(sd_date+' '+sd_time).format("YYYY-MM-DDThh:mm");

document.querySelector("#event-startdate").value = thisStartDate;
document.querySelector("#event-enddate").value = thisEndDate;
document.querySelector("#event-rsvpdate").value = thisRSVPDate;

//console.log(thisStartDate);
//console.log(thisEndDate);

// Get references to page elements
var $eventName = $("#event-name");
var $eventStartDate = $("#event-startdate");
var $eventEndDate = $("#event-enddate");
var $eventRSVPDate = $("#event-rsvpdate");
var $eventCategory = $("#event-category");
var $eventLocation = $("#event-location");
var $eventDescription = $("#event-description");
var $submitBtn = $("#submit");
var $eventList = $("#event-list");


// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/events",
      data: JSON.stringify(example)
    });
  },
  getEvents: function() {
    return $.ajax({
      url: "api/events",
      type: "GET"
    });
  },
  deleteEvent: function(id) {
    return $.ajax({
      url: "api/events/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshEvents = function() {
  API.getEvents().then(function(data) {
    console.log("Refreshing events...");

    var $events = data.map(function(thisEvent) {
      var $a = $("<a>")
        .text(thisEvent.title)
        .attr("href", "/event/" + thisEvent.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": thisEvent.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete mx-1")
        .text(" Delete");

      var $ebutton = $("<button>")
        .addClass("btn btn-primary float-right mx-1")
        .text(" Edit");

      var $trashcan = $("<i>").addClass("fas fa-trash-alt");
      var $editpencil = $("<i>").addClass("fas fa-pen");

      $button.prepend($trashcan);
      $li.append($button);

      $ebutton.prepend($editpencil);
      $li.append($ebutton);

      return $li;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var thisEvent = {
    title: $eventName.val().trim(),
    startdate: $eventStartDate.val().trim(),
    enddate: $eventEndDate.val().trim(),
    rsvpdate: $eventRSVPDate.val().trim(),
    category: $eventCategory.val().trim(),
    location: $eventLocation.val().trim(),
    description: $eventDescription.val().trim()
  };

  if (!(thisEvent.title && thisEvent.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveEvent(thisEvent).then(function() {
    refreshEvents();
  });

  $eventName.val("");
  $eventStartDate.val("");
  $eventEndDate.val("");
  $eventRSVPDate.val("");
  $eventCategory.val("");
  $eventLocation.val("");
  $eventDescription.val("");

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteEvent(idToDelete).then(function() {
    refreshEvents();
  });
};

// var formatDate = function(date) {
//   moment(date).format("YYYY-MM-DD");
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$eventList.on("click", ".delete", handleDeleteBtnClick);

refreshEvents();
