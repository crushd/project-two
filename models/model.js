module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define("Model", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return Model;
};
