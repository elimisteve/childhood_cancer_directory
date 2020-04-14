'use strict';
module.exports = (sequelize, DataTypes) => {
  const offer = sequelize.define('offer', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  offer.associate = function(models) {
    // associations can be defined here
  };
  return offer;
};