'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MeltingEntry extends Model {
    static associate(models) {
      MeltingEntry.hasMany(models.ScrapEntry, { foreignKey: 'melting_id' })
      MeltingEntry.belongsTo(models.Customer, { foreignKey: 'customer_id', constraints: false })
    }
  }
  MeltingEntry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    total_scrap: { type: DataTypes.DOUBLE, allowNull: false },
    rate: { type: DataTypes.DOUBLE, allowNull: false },
    tax_rate: { type: DataTypes.DOUBLE, allowNull: false },
    total_amount: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    sequelize,
    modelName: 'MeltingEntry',
    tableName: 'melting_entry'
  });
  return MeltingEntry;
};