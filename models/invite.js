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
      }
    });

    Invite.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Invite.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false
        }
      });

    };
    
    return Invite;
  };
  
