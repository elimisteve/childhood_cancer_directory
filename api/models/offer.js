'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
  };
  return Offer;
};