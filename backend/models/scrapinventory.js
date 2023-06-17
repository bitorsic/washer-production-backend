'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScrapInventory extends Model {
    static associate(models) {
      ScrapInventory.hasMany(models.ScrapEntry, { foreignKey: 'scrap_id' })
    }
  }
  ScrapInventory.init({
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    material: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'ScrapInventory',
    tableName: 'scrap_inventory'
  });
  return ScrapInventory;
};