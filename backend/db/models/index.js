const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Client = require('./client');
const Employee = require('./employee');
const ClockInOut = require('./clockinout');

// Optionally, you can import other models similarly
// const OtherModel = require('./othermodel');

const db = {};

// Register models
db.Client = Client;
db.Employee = Employee;
db.ClockInOut = ClockInOut;

// Define associations
db.Client.hasMany(db.ClockInOut);
db.Employee.hasMany(db.ClockInOut);
db.ClockInOut.belongsTo(db.Client);
db.ClockInOut.belongsTo(db.Employee);



// Sync all defined models to the database
(async () => {
  await sequelize.sync({ alter: true});
  console.log('All models synced');

})();

// Export the sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
