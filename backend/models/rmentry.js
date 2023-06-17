'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RMEntry extends Model {
    static associate(models) {
      RMEntry.belongsTo(models.RMInventory, { foreignKey: 'raw_material_id', constraints: false })
    }
  }
  RMEntry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    lot_no: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
    raw_material_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'RMEntry',
    tableName: 'rm_entry'
  });
  return RMEntry;
};