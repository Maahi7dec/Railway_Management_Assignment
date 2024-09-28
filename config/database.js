const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, 
  }
);

module.exports = sequelize;
