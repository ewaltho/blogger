const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPwd) {
    return bcrypt.compareSync(loginPwd, this.password)
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    hooks: {
      beforeCreate: async (userObj) => {
        userObj.password = await bcrypt.hash(userObj.password, 4);
        return userObj;
      },
    }
  }
);

module.exports = User;
