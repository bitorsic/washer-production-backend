'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WasherInventory extends Model {
    static associate(models) {
      WasherInventory.hasMany(models.ProductionEntry, { foreignKey: 'part_no' })
      WasherInventory.hasMany(models.DeliveryEntry, { foreignKey: 'part_no' })
      WasherInventory.belongsTo(models.RMInventory, { foreignKey: 'raw_material_id', constraints: false })
    }
  }
  WasherInventory.init({
    part_no: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
    raw_material_id: { type: DataTypes.INTEGER, allowNull: false },
    size: { type: DataTypes.DOUBLE, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'WasherInventory',
    tableName: 'washer_inventory'
  });
  return WasherInventory;
};