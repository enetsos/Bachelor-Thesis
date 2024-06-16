'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SurveyResponse.belongsTo(models.UserProfile, { foreignKey: 'client_id', as: 'client' });
    }
  }
  SurveyResponse.init({
    client_id: DataTypes.INTEGER,
    response_data: DataTypes.JSON,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SurveyResponse',
  });
  return SurveyResponse;
};