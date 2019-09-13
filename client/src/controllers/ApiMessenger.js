import {Events, EventTypes, APIMessengerTypes} from './EventController';
import {currentProject, CurrentProjectList} from './InterfaceModel';

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

  const createProject = (newProject) => {
    console.log('Sending create project to API');
    const addUrl = `${backEndURL}/api/projects`;
    const theBody = {project: newProject};

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
        Events.publish(EventTypes.addProject, data.project);
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
        currentProject.project = data.info;
        Events.publish(EventTypes.changeProject, data.tasks);
      });
  };

  const getUserInbox = (userId) => {
    console.log('Getting user inbox');

    const url = `${backEndURL}/api/projects/user/${userId}/inbox`;
    fetch(url, {
      method: 'GET',
    })
      .then((res) => {
        console.log('GET inbox response: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('GET data: ', data);
        console.log('Inbox: ', data.info);
        currentProject.id = data.info._id;
        currentProject.project = data.info;
        console.log("currentProject: ", currentProject.project);
        Events.publish(EventTypes.changeProject, data.tasks);
      });
  };

  const deleteProject = (projectId) => {
    console.log('Deleting project: ', projectId);

    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      console.log('DELETE result: ', res);
      const matchFunc = (thisProject) => thisProject._id === projectId;

      CurrentProjectList.removeFirst(matchFunc);

      Events.publish(EventTypes.deleteProjectById, matchFunc);
      getUserInbox('testUser');
    });
  };


  Events.subscribe(APIMessengerTypes.addTask, createTask.bind(this));
  Events.subscribe(APIMessengerTypes.editTask, editTask.bind(this));
  Events.subscribe(APIMessengerTypes.deleteTask, deleteTask.bind(this));

  Events.subscribe(APIMessengerTypes.addProject, createProject.bind(this));
  Events.subscribe(APIMessengerTypes.changeProjectList, getProjectList.bind(this));
  Events.subscribe(APIMessengerTypes.changeProject, getProjectTasks.bind(this));
  Events.subscribe(APIMessengerTypes.removeProject, deleteProject.bind(this));
  Events.subscribe(APIMessengerTypes.getInbox, getUserInbox.bind(this));

  return {
    createTask,
    getProjectTasks,
    getProjectList,
    deleteProject,
    getUserInbox,
  };
})();

export default ApiMessenger;
