'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {}
  Auth.init({
    email: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
    pass: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Auth',
    tableName: 'auth'
  });
  return Auth;
};