'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/dbConfig.js');
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate().then(result => console.log('DB connection: Success'), error => console.log('DB connection: Error'))

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
