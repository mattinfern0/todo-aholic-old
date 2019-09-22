const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
