'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    location:  {type: DataTypes.STRING, allowNull : false},
    description: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    token: DataTypes.VIRTUAL,
    isPatient: DataTypes.VIRTUAL,
    helpTypes: DataTypes.VIRTUAL,
    network: DataTypes.VIRTUAL,
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
    delete values.volunteer;
    delete values.patient;

    return values;
  }
  user.associate = function(models) {
    user.hasOne(models.volunteer);
    user.hasOne(models.patient);
  };
  return user;
};