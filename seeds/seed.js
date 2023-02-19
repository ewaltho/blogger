const sequelize = require("../config/connection");
const { User, Post} = require("../models");

const seed = async () => {
  await sequelize.sync({ force: true });
  const user = await User.bulkCreate(
    [

    ],
    {
      individualHooks: true,
    }
  );
};

seed();