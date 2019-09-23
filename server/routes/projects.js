const express = require('express');
const passport = require('passport');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/', projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:projectId', projectController.getProjectInfo);
router.put('/:projectId', projectController.updateProject);
router.delete('/:projectId', projectController.deleteProject);

router.get('/user/:userId', passport.authenticate('jwt', { session: false }), projectController.getUserProjects);
router.get('/user/:userId/inbox', projectController.getUserInbox);

// For testing purposes
router.get('/user/:user/testAuth', passport.authenticate('jwt', { session: false }), projectController.getAllProjects);
module.exports = router;
