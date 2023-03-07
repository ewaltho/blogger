const express = require('express');
const router = express.Router();

const userApiRoutes = require('./userApiRoutes');
router.use('/users', userApiRoutes);

const postApiRoutes = require('./postApiRoutes');
router.use('/posts', postApiRoutes);

module.exports = router;