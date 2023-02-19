const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Plant extends Model {}

Plant.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    entry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    }
  },
  {
    sequelize,
  }
);

module.exports = Plant;