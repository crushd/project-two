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
    var $events = data.map(function(example) {
      var $a = $("<a>")
        .text(event.text)
        .attr("href", "/event/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": event.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

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

  var event = {
    title: $eventName.val().trim(),
    startdate: $eventStartDate.val().trim(),
    enddate: $eventEndDate.val().trim(),
    rsvpdate: $eventRSVPDate.val().trim(),
    category: $eventCategory.val().trim(),
    location: $eventLocation.val().trim(),
    description: $eventDescription.val().trim()
  };

  if (!(event.title && event.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveEvent(event).then(function() {
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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$eventList.on("click", ".delete", handleDeleteBtnClick);
