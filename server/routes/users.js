const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/checkToken'); // Will be used to check for expired tokens
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:userId', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.delete('/:userId', passport.authenticate('jwt', { session: false }), userController.deleteUser);

module.exports = router;
