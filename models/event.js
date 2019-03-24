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

  Event.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Event.hasMany(models.Invite, {
      onDelete: "cascade"
    });
  };

  return Event;
};


var nodemailer = require("nodemailer");

