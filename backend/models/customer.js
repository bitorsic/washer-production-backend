'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.DeliveryEntry, { foreignKey: 'customer_id' })
      Customer.hasMany(models.MeltingEntry, { foreignKey: 'customer_id' })
    }
  }
  Customer.init({
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customer'
  });
  return Customer;
};