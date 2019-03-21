module.exports = function(sequelize, DataTypes) {
  var UserEvent = sequelize.define("UserEvent", {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  return UserEvent;
};
