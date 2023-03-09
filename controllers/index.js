const express = require("express");
const router = express.Router();

const userRoutes = require('./userController');
router.use("/users", userRoutes)

const postRoutes = require('./postController');
router.use("/posts", postRoutes)

const frontEndRoutes = require("./frontEndRoutes");
router.use("/", frontEndRoutes);

module.exports = router;