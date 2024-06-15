'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceIssueReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ServiceIssueReport.belongsTo(models.UserProfile, { foreignKey: 'client_id', as: 'client' });
    }
  }
  ServiceIssueReport.init({
    client_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    attachments: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ServiceIssueReport',
  });
  return ServiceIssueReport;
};