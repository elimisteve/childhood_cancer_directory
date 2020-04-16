'use strict';
module.exports = (sequelize, DataTypes) => {
  const volunteer = sequelize.define('volunteer', {
    user_id:{type: DataTypes.INTEGER, primaryKey: true}
  }, {});
  volunteer.associate = function(models) {
    // associations can be defined here
    volunteer.belongsTo(models.user);
    volunteer.belongsToMany(models.patient, {through: 'patient_volunteer'});
  };
  return volunteer;
};