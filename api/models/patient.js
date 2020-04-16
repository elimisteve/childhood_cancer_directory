'use strict';
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    user_id:{type: DataTypes.INTEGER, primaryKey: true}
  }, {});
  patient.associate = function(models) {
    // associations can be defined here
    patient.belongsTo(models.user);
    patient.belongsToMany(models.volunteer, {through: 'patient_volunteer'});
  };
  return patient;
};