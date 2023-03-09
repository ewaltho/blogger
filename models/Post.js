const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isAlphanumeric: true,
      // },
    },
    entry: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlphanumeric: true,
      // }
    }
  },
  {
    sequelize,
  }
);

module.exports = Post;