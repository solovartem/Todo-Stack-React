'use strict';

const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

module.exports = sequelize;
