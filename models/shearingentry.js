'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShearingEntry extends Model {
    static associate(models) {
      ShearingEntry.belongsTo(models.RMInventory, { as: 'SheetRM', foreignKey: 'sheet_rm_id', constraints: false })
      ShearingEntry.belongsTo(models.RMInventory, { as: 'StripRM', foreignKey: 'strip_rm_id', constraints: false })
    }
  }
  ShearingEntry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    sheet_rm_id: { type: DataTypes.INTEGER, allowNull: false },
    strip_rm_id: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false },
    sheet_quantity: { type: DataTypes.INTEGER, allowNull: false },
    strip_quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'ShearingEntry',
    tableName: 'shearing_entry'
  });
  return ShearingEntry;
};