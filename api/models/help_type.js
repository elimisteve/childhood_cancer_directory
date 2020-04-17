'use strict';
module.exports = (sequelize, DataTypes) => {
  const help_type = sequelize.define('help_type', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  help_type.associate = function(models) {
    // associations can be defined here
    help_type.belongsToMany(models.volunteer, {through: 'volunteer_help_type', timestamps: false});
    help_type.belongsToMany(models.patient, {through: 'patient_help_type', timestamps: false});
  };
  return help_type;
};