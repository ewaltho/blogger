const sequelize = require("../config/connection");
const { User, Post} = require("../models");

const seed = async () => {
  await sequelize.sync({ force: true });
  const user = await User.bulkCreate(
    [
      {
        email: 'ejwaltho@gmail.com',
        username: 'ewaltho',
        password: 'cherry'
      }
    ],
    {
      individualHooks: true,
    }
  );
  
  const post = await Post.bulkCreate(
    [
      {
        title: 'Horses',
        entry: 'I like horses'
      }
    ]
    )
    process.exit(1);
  };

seed();