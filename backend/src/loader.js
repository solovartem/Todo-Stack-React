require('./config/server');
require('./config/database');

const dbConfig = require('../src/config/database');
const Sequelize = require('sequelize');
const connection = new Sequelize(dbConfig);
const Todo = require('./api/todo/Todo');

Todo.init(connection);

connection.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log('Unable to connect to the database:', err))

module.exports = Sequelize;
