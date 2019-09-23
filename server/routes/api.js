const express = require('express');
const tasksRouter = require('./tasks');
const projectsRouter = require('./projects');
const usersRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Api working!',
  });
});

router.use('/tasks', tasksRouter);
router.use('/projects', projectsRouter);
router.use('/users', usersRouter);

module.exports = router;
