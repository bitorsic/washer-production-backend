'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RMInventory extends Model {
    static associate(models) {
      RMInventory.hasMany(models.RMEntry, { foreignKey: 'raw_material_id' })
      RMInventory.hasMany(models.ShearingEntry, { as: 'SheetRM', foreignKey: 'sheet_rm_id' })
      RMInventory.hasMany(models.ShearingEntry, { as: 'StripRM', foreignKey: 'strip_rm_id' })
      RMInventory.hasMany(models.WasherInventory, { foreignKey: 'raw_material_id' })
      RMInventory.hasMany(models.ProductionEntry, { foreignKey: 'raw_material_id' })
    }
  }
  RMInventory.init({
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    material: { type: DataTypes.STRING, allowNull: false },
    form: { type: DataTypes.STRING, allowNull: false },
    thickness: { type: DataTypes.DOUBLE, allowNull: false },
    length: DataTypes.DOUBLE,
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'RMInventory',
    tableName: 'rm_inventory'
  });
  return RMInventory;
};