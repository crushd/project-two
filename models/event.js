module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    startdate: {
        type: DataTypes.DATE
    },
    enddate: {
        type: DataTypes.DATE
    },
    rsvpdate: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
  });
  
  return Event;
};
