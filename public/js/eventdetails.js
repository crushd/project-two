// console.log("Event Details Javascript loading....");
// console.log("This Id: " + thisId);
// console.log("This event Id: " + eventId);
const url = require('url');

console.log(url);

var getThisEventDetails = function(thisId) {

    API.getOneEvent(thisId).then(function(data) {
      console.log("DATA: "+ data);
    })
  
};

getThisEventDetails(2);