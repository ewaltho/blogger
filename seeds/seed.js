const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const seed = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(
    [
      {
        email: "ejwaltho@gmail.com",
        username: "ewaltho",
        password: "cherry"
      }
    ],
    {
      individualHooks: true,
    }
  );
  
  const posts = await Post.bulkCreate(
    [
      {
        UserId: 1,
        title: "Horses",
        entry: "I like horses"
      }
    ])
    process.exit(1);
  };

seed();