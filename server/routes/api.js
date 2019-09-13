const express = require('express');
const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Server working!');
});

router.post('/tasks', taskController.createTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:projectId', projectController.getProjectInfo);
router.put('/projects/:projectId', projectController.updateProject);
router.delete('/projects/:projectId', projectController.deleteProject);

router.get('/projects/user/:user');
router.get('/projects/user/:user/inbox', projectController.getUserInbox);

module.exports = router;
