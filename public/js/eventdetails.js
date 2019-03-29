console.log("Event Details Javascript loading....");

// console.log("This Id: " + thisId);
// console.log("This event Id: " + eventId);

var getThisEventDetails = function(thisId) {

    API.getOneEvent(thisId).then(function(data) {
      console.log("DATA: "+ data);
    })
  
};

getThisEventDetails(2);