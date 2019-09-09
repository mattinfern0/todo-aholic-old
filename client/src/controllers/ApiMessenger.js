import {Events, EventTypes, APIMessengerTypes} from './EventController';

const backEndURL = "http://localhost:3001"

const ApiMessenger = (() => {
    const createTask = (taskObject) => {
        console.log("Sending create request to API");

        taskObject.project =  "5d74c6f92a73857006c0dadd"; // For testing purposes
        const addUrl = backEndURL + "/api/tasks";
        const theBody = {task: taskObject};

        fetch(addUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(theBody),
        })
        .then(res => res.json())
        .then((data) => {
            console.log("Add result:",data);
            Events.publish(EventTypes.addTask, data.task)
        });
    }

    const editTask = (updatedTask) => {
        const taskId = updatedTask._id;
        const url = backEndURL + "/api/tasks/" + taskId;
        const theBody = {task: updatedTask};

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(theBody),
        })
        .then(res => res.json())
        .then((data) => {
            console.log("PUT result:",data);

            var matchFunc = (thisTask) => {
                return thisTask._id === updatedTask._id;
            }

            var modifyFunc = (task) => {
                task = JSON.parse(JSON.stringify(updatedTask));
                return task;
            }

            Events.publish(EventTypes.editTaskById,{matchFunc, modifyFunc});
        });
    }

    const deleteTask = (taskId) => {
        console.log("Deleting task: ", taskId);
        
        const url = backEndURL + "/api/tasks/" + taskId;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            console.log("DELETE result: ",res);
            var matchFunc = (thisTask) => {
                return thisTask._id === taskId;
            }

            Events.publish(EventTypes.deleteTaskById, matchFunc)
        })

    }

    const getProjectTasks = (projectId) => {
        console.log("GETting project");
        const testId = "5d74c6f92a73857006c0dadd";

        const url = backEndURL + "/api/projects/" + testId;
        fetch(url, {
            method: 'GET',
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log("GET result:",data);
            console.log("The tasks: ", data.tasks);
            Events.publish(EventTypes.changeProject, data.tasks);
        });
    }

    Events.subscribe(APIMessengerTypes.addTask, createTask.bind(this));
    Events.subscribe(APIMessengerTypes.editTask, editTask.bind(this));
    Events.subscribe(APIMessengerTypes.deleteTask, deleteTask.bind(this));
    Events.subscribe(APIMessengerTypes.changeProject, getProjectTasks.bind(this));
    

    return {
        createTask,
        getProjectTasks,
    }
})();

//fsfs
export default ApiMessenger;