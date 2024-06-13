const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./userprofile');
const ClockInOut = require('./clockinout');

// Optionally, you can import other models similarly
// const OtherModel = require('./othermodel');

const db = {};

// Register models
db.User = User;
db.ClockInOut = ClockInOut;
// Add other models if needed
// db.OtherModel = OtherModel;

// Define associations
db.User.hasMany(db.ClockInOut, {
  foreignKey: 'employee_id',
});
db.ClockInOut.belongsTo(db.User, {
  foreignKey: 'employee_id',
}
);

// Sync all defined models to the database
(async () => {
  await sequelize.sync({ alter: true});
  console.log('All models synced');
})();

// Export the sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
