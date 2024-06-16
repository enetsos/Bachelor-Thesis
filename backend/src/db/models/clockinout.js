const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class ClockInOut extends Model {}

ClockInOut.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ClockInOut',
    timestamps: true,
  }
);

module.exports = ClockInOut;
