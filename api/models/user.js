'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.VIRTUAL,
    isPatient: DataTypes.VIRTUAL,
  }, {});
    user.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  user.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  user.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())
    delete values.password;
    return values;
  }
  user.associate = function(models) {
    user.hasOne(models.volunteer);
    user.hasOne(models.patient);
  };
  return user;
};