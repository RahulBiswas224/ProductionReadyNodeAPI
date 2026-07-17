const express = require('express');
const userController = require('./user.controller');
const router = express.Router();

router.get('/', userController.getRealUsers);

module.exports = router;