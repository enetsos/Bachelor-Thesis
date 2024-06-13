const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); // Adjust path as per your configuration

const sequelizeConfig = config['development']; // Adjust as per your environment

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    define: {
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;
