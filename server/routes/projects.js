const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/', projectController.createProject);
router.get('/:projectId', projectController.getProjectInfo);
router.put('/:projectId', projectController.updateProject);
router.delete('/:projectId', projectController.deleteProject);

router.get('/user/:userId', projectController.getUserProjects);
router.get('/user/:userId/inbox', projectController.getUserInbox);

module.exports = router;
