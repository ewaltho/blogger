const express = require("express");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/", (req, res) => {
    res.render("home");
  });

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) =>{
  res.render("signup");
});

router.get('/userposts', (req, res) => {
  User.findByPk(req.session.userId, {
    include: {
      model: Post
    }
  }).then((userdata) => {
    // const hbsData = userdata.toJSON();
    // res.render('userposts', hbsData);
    res.json(userdata);
  });
})

module.exports = router;