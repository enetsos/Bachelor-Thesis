'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssueReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      IssueReport.belongsTo(models.UserProfile, { foreignKey: 'employee_id', as: 'employee' });
    IssueReport.belongsTo(models.UserProfile, { foreignKey: 'client_id', as: 'client' });
    }
  }
  IssueReport.init({
    employee_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    attachments: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'IssueReport',
  });
  return IssueReport;
};