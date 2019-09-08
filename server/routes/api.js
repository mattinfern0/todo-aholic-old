const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController')

/* Routes:
    Test example: 
    Create task: POST /tasks/
    Update task: PUT /tasks/:taskId
    Delete task: DELETE /tasks/:taskIdclear


    Create project: POST /projects
    Get ALL projects: GET /projects
    Update project: PUT /projects/:projectId
    Delete project: DELETE /projects/:projectId

    LATER ON:
    Create user: POST /users/
    Get user: GET /users/:userId

    Create project for user: POST /projects/user/:userid
    Get user's projects: GET /projects/user/:userid 

    NOT SURE:
    Get task: GET /tasks/:taskId
    Get a project: GET /projects/:projectId
*/

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getAllTasks) // Only for example, don't use later
router.put("/tasks/:taskId", taskController.updateTask);
router.delete("/tasks/:taskId", taskController.deleteTask);

router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:projectId", projectController.getProjectInfo);
router.put("/projects/:projectId", projectController.updateProject);
router.delete("/projects/:projectId", projectController.deleteProject);

module.exports = router;

