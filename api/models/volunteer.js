'use strict';
module.exports = (sequelize, DataTypes) => {
  const volunteer = sequelize.define('volunteer', {
    user_id: DataTypes.INTEGER
  }, {});
  volunteer.associate = function(models) {
    // associations can be defined here
    volunteer.belongsTo(models.user);
  };
  return volunteer;
};