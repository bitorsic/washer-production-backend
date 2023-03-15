'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DeliveryEntry extends Model {
    static associate(models) {
      DeliveryEntry.belongsTo(models.WasherInventory, { foreignKey: 'part_no', constraints: false })
      DeliveryEntry.belongsTo(models.Customer, { foreignKey: 'customer_id', constraints: false })
    }
  }
  DeliveryEntry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    part_no: { type: DataTypes.INTEGER, allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DOUBLE, allowNull: false },
    rate: { type: DataTypes.DOUBLE, allowNull: false },
    tax_rate: { type: DataTypes.DOUBLE, allowNull: false },
    total_amount: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'DeliveryEntry',
    tableName: 'delivery_entry'
  });
  return DeliveryEntry;
};