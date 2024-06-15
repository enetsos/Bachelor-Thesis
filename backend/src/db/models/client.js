const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Client extends Model { }

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps: true,
  }
);

module.exports = Client;
