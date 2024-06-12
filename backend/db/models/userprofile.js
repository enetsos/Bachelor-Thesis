'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.hasMany(models.ClockInOut, { foreignKey: 'employee_id', as: 'clockInOuts' });
      UserProfile.hasMany(models.ClockInOut, { foreignKey: 'client_id', as: 'clientClockInOuts' });
      UserProfile.hasMany(models.IssueReport, { foreignKey: 'employee_id', as: 'issueReports' });
      UserProfile.hasMany(models.IssueReport, { foreignKey: 'client_id', as: 'clientIssueReports' });
      UserProfile.hasMany(models.OrderRequest, { foreignKey: 'employee_id', as: 'orderRequests' });
      UserProfile.hasMany(models.Feedback, { foreignKey: 'supervisor_id', as: 'supervisorFeedbacks' });
      UserProfile.hasMany(models.Feedback, { foreignKey: 'employee_id', as: 'employeeFeedbacks' });
      UserProfile.hasMany(models.Feedback, { foreignKey: 'client_id', as: 'clientFeedbacks' });
      UserProfile.hasMany(models.ServiceIssueReport, { foreignKey: 'client_id', as: 'serviceIssueReports' });
      UserProfile.hasMany(models.SurveyResponse, { foreignKey: 'client_id', as: 'surveyResponses' });  
    }
  }
  UserProfile.init({
    role: DataTypes.STRING,
    name: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    other_details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};