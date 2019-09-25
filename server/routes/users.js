const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/checkToken'); // Will be used to check for expired tokens
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
