'use strict';
var bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define('person', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    location: DataTypes.STRING,
    patient: DataTypes.BOOLEAN,
    volunteer: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
  }, {});
  person.beforeSave((person, options) => {
    if(person.changed('password')){
      person.password = bcrypt.hashSync(person.password, bcrypt.genSaltSync(10), null);
    }
  });
  person.prototype.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if(err){
        return cb(err);
      }
      cb(null, isMatch);
    })
  };
  person.associate = function(models) {
    // associations can be defined here
  };
  return person;
};