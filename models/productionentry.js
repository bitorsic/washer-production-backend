'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductionEntry extends Model {
    static associate(models) {
      ProductionEntry.hasMany(models.ScrapEntry, { foreignKey: 'production_id' })
      ProductionEntry.belongsTo(models.WasherInventory, { foreignKey: 'part_no', constraints: false })
      ProductionEntry.belongsTo(models.RMInventory, { foreignKey: 'raw_material_id', constraints: false })
      ProductionEntry.belongsTo(models.RMEntry, { foreignKey: 'lot_no', constraints: false })
    }
  }
  ProductionEntry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    raw_material_id: { type: DataTypes.INTEGER, allowNull: false },
    part_no: { type: DataTypes.INTEGER, allowNull: false },
    rm_quantity: { type: DataTypes.INTEGER, allowNull: false },
    rm_weight: { type: DataTypes.DOUBLE, allowNull: false },
    return_rm_quantity: { type: DataTypes.INTEGER, allowNull: false },
    return_rm_weight: { type: DataTypes.DOUBLE, allowNull: false },
    washer_quantity: { type: DataTypes.INTEGER, allowNull: false },
    washer_weight: { type: DataTypes.DOUBLE, allowNull: false },
    total_scrap: { type: DataTypes.DOUBLE, allowNull: false },
  }, {
    sequelize,
    modelName: 'ProductionEntry',
    tableName: 'production_entry'
  });
  return ProductionEntry;
};