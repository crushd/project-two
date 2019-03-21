module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: "meetup"
    },
    location: DataTypes.STRING,
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
