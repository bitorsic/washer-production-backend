'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {}
  Config.init({
    material_val: DataTypes.STRING,
    form_val: DataTypes.STRING,
    scrap_type_val: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Config',
    tableName: 'config'
  });
  return Config;
};