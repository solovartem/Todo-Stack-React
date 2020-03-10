'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todoSchemas', [{
      description: 'https://github.com/douglasgodoy1998',
    }, {
      description: 'Data demo!',
    }, {
      description: 'https://github.com/douglasgodoy1998',
    }, {
      description: 'Data demo!',
    }, {
      description: 'https://github.com/douglasgodoy1998',
    }, {
      description: 'Data demo!',
    },
    ])
  },
};
