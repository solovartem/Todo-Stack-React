'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'todoSchemas',
      'updatedAt',
      'updated_at'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'todoSchemas',
      'updated_at',
      'updatedAt'
    );
  }
};
