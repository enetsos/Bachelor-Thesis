'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(models.UserProfile, { foreignKey: 'supervisor_id', as: 'supervisor' });
    Feedback.belongsTo(models.UserProfile, { foreignKey: 'employee_id', as: 'employee' });
    Feedback.belongsTo(models.UserProfile, { foreignKey: 'client_id', as: 'client' });
    }
  }
  Feedback.init({
    supervisor_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    attachments: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};