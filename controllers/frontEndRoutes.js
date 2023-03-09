const express = require("express");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/", (req, res) => {
  res.render("home");
})

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) =>{
  res.render("signup");
});

router.get("/newpost", (req,res) => {
  res.render("newpost");
});

router.get("/allposts",(req,res)=>{
  Post.findAll({
    include: {
        model: User,
    }
}).then(userdata => {
    console.log(userdata)
    const hbsData = userdata.map((banana) => {
      return banana.toJSON();
    });
    console.log('==============================')
    console.log(hbsData)
    res.render("allposts", {posts:hbsData})
})
});

router.get("/profile", (req, res) =>{
  User.findByPk(req.session.userId,{
    include: {
      model: Post,
    }
  }).then(userdata => {
    console.log(userdata)
    const hbsData = userdata.toJSON();
    console.log('==============================')
    console.log(hbsData)
    res.render("userposts", {userdata:hbsData})
  })
});


module.exports = router;
