const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController')

/* Routes:
    Test example: curl -X POST -H "Content-Type:application/json" http://localhost:3000/api/tasks -d '{"task:{"name":"An example task","id": "12345"}}'
    Create task: POST /tasks/
    Get task: GET /tasks/:taskId
    Update task: PUT /tasks/:taskId
    Delete task: DELETE /tasks/:taskId

    Create project: POST /projects/
    Get ALL projects: GET /projects/
    Get a project: GET /projects/:projectId
    Update project: PUT /projects/:projectId
    Delete project: DELETE /projects/:projectId

    LATER ON:
    Create user: POST /users/
    Get user: GET /users/:userId

    Create project for user: POST /projects/user/:userid
    Get user's projects: GET /projects/user/:userid 
*/

router.post("/tasks", taskController.createTask);
router.put("/tasks/:taskId", taskController.updateTask);
router.delete("/tasks/:taskId", taskController.deleteTask);

router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.put("/projects/:projectId", projectController.updateProject);
router.delete("/projects/:projectId", projectController.deleteProject);

module.exports = router;