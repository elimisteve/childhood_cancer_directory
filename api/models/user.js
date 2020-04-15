'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasOne(models.volunteer);
    user.hasOne(models.patient);
  };
  return user;
};