module.exports = function(sequelize, DataTypes) {
    var Invite = sequelize.define("Invite", {
      email: {
          type: DataTypes.STRING,
          validate: {
              isEmail: true
            }
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      event_id: {
        type: DataTypes.STRING
      }
    });
    
    return Invite;
  };
  