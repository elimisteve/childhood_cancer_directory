'use strict';
module.exports = (sequelize, DataTypes) => {
  const help_type = sequelize.define('help_type', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  help_type.associate = function(models) {
    // associations can be defined here
  };
  return help_type;
};