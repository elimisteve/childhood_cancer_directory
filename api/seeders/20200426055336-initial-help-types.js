'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('help_type' ,[
      {
        name: 'Cooking',
        description: 'Help with preparing meals',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'General Errands',
        description: 'Help with general errands',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Groceries',
        description: 'Help getting groceries',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lawn care',
        description: 'Help tending a lawn or garden',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pet care',
        description: 'Help taking care of a pet; taking them for walks, cleaning up after them etc..',
        created_at: new Date(),
        updated_at: new Date(),

      },
      {
        name: 'Transportation',
        description: 'Help with basic transportation',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
