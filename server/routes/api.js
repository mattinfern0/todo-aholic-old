const express = require('express');
const passport = require('passport');

const tasksRouter = require('./tasks');
const projectsRouter = require('./projects');
const usersRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Api working!',
  });
});

router.use('/tasks', passport.authenticate('jwt', { session: false }), tasksRouter);
router.use('/projects', passport.authenticate('jwt', { session: false }), projectsRouter);
router.use('/users', usersRouter);

module.exports = router;
