const User = require("./User");
const Post = require('./Post')

Post.belongsTo(User)

module.exports = {
  User
};