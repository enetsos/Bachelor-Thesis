'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderRequest.belongsTo(models.UserProfile, { foreignKey: 'employee_id', as: 'employee' });
    }
  }
  OrderRequest.init({
    employee_id: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderRequest',
  });
  return OrderRequest;
};