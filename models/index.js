const User = require("./User");
const Post = require("./Post")

User.hasMany(Post);

Post.belongsTo(User , {
  onDelete: "CASCADE"
});

module.exports = {
  User, Post
};