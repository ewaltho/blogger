const express = require("express");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/", (req, res) => {
    res.render("home");
  });

module.exports = router;