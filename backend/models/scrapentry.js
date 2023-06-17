'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScrapEntry extends Model {
    static associate(models) {
      ScrapEntry.belongsTo(models.ScrapInventory, { foreignKey: 'scrap_id', constraints: false })
      ScrapEntry.belongsTo(models.MeltingEntry, { foreignKey: 'melting_id', constraints: false })
      ScrapEntry.belongsTo(models.ProductionEntry, { foreignKey: 'production_id', constraints: false })
    }
  }
  ScrapEntry.init({
    scrap_id: { type: DataTypes.INTEGER, allowNull: false },
    production_id: DataTypes.INTEGER,
    melting_id: DataTypes.INTEGER,
    weight_change: { type: DataTypes.DOUBLE, allowNull: false,
      validate: {
        signCheck(value) {
          if (this.melting_id != null && value > 0) {
            throw new Error("Scrap cannot increase for a melting entry");
          } else if (this.production_id != null && value < 0) {
            throw new Error("Scrap cannot decrease for a production entry");
          }
        }
      }
    }
  }, {
    validate: {
      bothOrNone() {
        if (this.melting_id == null && this.production_id == null) {
          throw new Error("either melting_id or production_id should be entered");
        }
        else if (this.melting_id != null && this.production_id != null) {
          throw new Error("both melting_id and production_id cannot be entered");
        }
      }
    },
    sequelize,
    modelName: 'ScrapEntry',
    tableName: 'scrap_entry'
  });
  return ScrapEntry;
};