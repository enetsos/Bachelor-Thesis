'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClockInOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClockInOut.belongsTo(models.UserProfile, { foreignKey: 'employee_id', as: 'employee' });
      ClockInOut.belongsTo(models.UserProfile, { foreignKey: 'client_id', as: 'client' });
    }
  }
  ClockInOut.init({
    employee_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    location: DataTypes.STRING,
    method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClockInOut',
  });
  return ClockInOut;
};