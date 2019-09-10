import {Events, EventTypes, APIMessengerTypes} from './EventController';
import {currentProject} from './InterfaceModel';

const backEndURL = 'http://localhost:3001';

const ApiMessenger = (() => {
  const createTask = (taskObject) => {
    console.log('Sending create request to API');

    // taskObject.project =  "5d74c6f92a73857006c0dadd"; // For testing purposes
    const newTask = taskObject;
    newTask.project = currentProject.id;
    const addUrl = `${backEndURL}/api/tasks`;
    const theBody = {task: newTask};

    fetch(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Add result:', data);
        Events.publish(EventTypes.addTask, data.task);
      });
  };

  const editTask = (updatedTask) => {
    const taskId = updatedTask._id;
    const url = `${backEndURL}/api/tasks/${taskId}`;
    const theBody = {task: updatedTask};

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('PUT result:', data);

        const matchFunc = (thisTask) => thisTask._id === updatedTask._id;

        const modifyFunc = (task) => {
          const newTask = JSON.parse(JSON.stringify(updatedTask));
          return newTask;
        };

        Events.publish(EventTypes.editTaskById, {matchFunc, modifyFunc});
      });
  };

  const deleteTask = (taskId) => {
    console.log('Deleting task: ', taskId);

    const url = `${backEndURL}/api/tasks/${taskId}`;
    fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      console.log('DELETE result: ', res);
      const matchFunc = (thisTask) => thisTask._id === taskId;

      Events.publish(EventTypes.deleteTaskById, matchFunc);
    });
  };

  const getProjectList = () => {
    console.log('Getting all projects');

    const url = `${backEndURL}/api/projects`;
    fetch(url, {
      method: 'GET',
    })
      .then((res) => {
        console.log('GET all projects response: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('GET data: ', data);
        console.log('The projects: ', data.projects);
        Events.publish(EventTypes.changeProjectList, data.projects);
      });
  };

  const getProjectTasks = (projectId) => {
    console.log('Getting taks for project: ', projectId);
    const testId = '5d74c6f92a73857006c0dadd';

    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'GET',
    })
      .then((res) => {
        console.log('Get tasks response: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('GET result:', data);
        console.log('The tasks: ', data.tasks);
        currentProject.id = projectId;
        Events.publish(EventTypes.changeProject, data.tasks);
      });
  };

  Events.subscribe(APIMessengerTypes.addTask, createTask.bind(this));
  Events.subscribe(APIMessengerTypes.editTask, editTask.bind(this));
  Events.subscribe(APIMessengerTypes.deleteTask, deleteTask.bind(this));

  Events.subscribe(APIMessengerTypes.changeProjectList, getProjectList.bind(this));
  Events.subscribe(APIMessengerTypes.changeProject, getProjectTasks.bind(this));

  return {
    createTask,
    getProjectTasks,
    getProjectList,
  };
})();

export default ApiMessenger;
