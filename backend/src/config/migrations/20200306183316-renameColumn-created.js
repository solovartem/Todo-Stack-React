'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'todoSchemas',
      'createdAt',
      'created_at'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'todoSchemas',
      'created_at',
      'createdAt'
    );
  }
};
