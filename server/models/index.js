const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const dbConfig = require('../config/config.js');

// Load environment variables from .env file
dotenv.config();
//config env
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env]; // Access the specific environment configuration

console.log(config); // Log the entire config object to verify its contents

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize
};

module.exports = db;