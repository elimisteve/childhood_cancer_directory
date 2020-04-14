'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.sequelize.transaction(t => {
     return Promise.all([
       queryInterface.createTable(
         'volunteer_help_type',
         {
           createdAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           updatedAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           volunteer_id: {
             type: Sequelize.INTEGER,
             primaryKey: true,
             references:{
               model: 'volunteer',
               key: 'id'
             }
           },
           help_type_id: {
             type: Sequelize.INTEGER,
             primaryKey: true,
             references:{
               model: 'help_type',
               key: 'id'
             }
           }
         }
       ),
       queryInterface.createTable(
         'patient_help_type',
         {
           createdAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           updatedAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           patient_id: {
             type: Sequelize.INTEGER,
             primaryKey: true,
             references:{
               model: 'patient',
               key: 'id'
             }
           },
           help_type_id: {
             type: Sequelize.INTEGER,
             primaryKey: true,
             references:{
               model: 'help_type',
               key: 'id'
             }
           }
         }
       )
     ])
   })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
     queryInterface.dropTable('volunteer_help_type'),
     queryInterface.dropTable('patient_help_type')
   ])
  }
};
