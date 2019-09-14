import {Events, EventTypes, APIMessengerTypes} from './EventController';
import {currentProject, CurrentProjectList} from './InterfaceModel';

const backEndURL = 'http://localhost:3001';

function processResponse(res){
  if (!res.ok){
    console.log('Bad response: ', res);
    throw new Error('Response not ok!');
  }
  return res.json();
}

const ApiMessenger = (() => {
  const checkServerStatus = () => {
    const url = `${backEndURL}/api`;
    return (
      fetch(url, { method: 'GET' })
        .then((res) => {
          if (!res.ok){
            throw new Error('Response not ok!');
          }
        })
    );
  };

  const createTask = (taskObject) => {
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
      .then((res) => processResponse(res))
      .then((data) => {
        console.log('create task response: ', data);
        Events.publish(EventTypes.addTask, data.task);
      }).catch((err) => {
        console.log('Error creating task: ', err);
        alert('Sorry! Something went wrong while creating your task!');
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
      .then((res) => processResponse(res))
      .then((data) => {
        console.log('edit task response: ', data);
        const matchFunc = (thisTask) => thisTask._id === updatedTask._id;

        const modifyFunc = (task) => {
          const newTask = JSON.parse(JSON.stringify(updatedTask));
          return newTask;
        };

        Events.publish(EventTypes.editTaskById, {matchFunc, modifyFunc});
      }).catch((err) => {
        console.log('Error editing task: ', err);
        alert('Sorry, something went wrong while modifying your task!');
      });
  };

  const deleteTask = (taskId) => {
    const url = `${backEndURL}/api/tasks/${taskId}`;
    fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error('Res not ok');
      }
      console.log('DELETE result: ', res);
      const matchFunc = (thisTask) => thisTask._id === taskId;

      Events.publish(EventTypes.deleteTaskById, matchFunc);
    }).catch((err) => {
      console.log('delete task error: ', err);
      alert('Sorry! Something went wrong while deleting this task!');
    });
  };

  const createProject = (newProject) => {
    const addUrl = `${backEndURL}/api/projects`;
    const theBody = {project: newProject};

    fetch(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    }).then((res) => processResponse(res))
      .then((data) => {
        console.log('Create project res:', data);
        Events.publish(EventTypes.addProject, data.project);
      }).catch((err) => {
        console.log('create project error: ', err);
        alert('Sorry! Something went wrong while creating your project!');
      });
  };

  const getProjectList = () => {
    const url = `${backEndURL}/api/projects`;
    fetch(url, {
      method: 'GET',
    }).then((res) => processResponse(res))
      .then((data) => {
        Events.publish(EventTypes.changeProjectList, data.projects);
      }).catch((err) => {
        console.log('get all projects error: ', err);
        alert('Sorry! Something went wrong while getting your projects!');
      });
  };

  const getProjectTasks = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'GET',
    })
      .then((res) => processResponse(res))
      .then((data) => {
        currentProject.id = projectId;
        currentProject.project = data.info;
        Events.publish(EventTypes.changeProject, data.tasks);
      }).catch((err) => {
        console.log('get project\'s tasks error: ', err);
        alert('Sorry! Something went wrong while getting this project\'s tasks!');
      });
  };

  const getUserInbox = (userId) => {
    const url = `${backEndURL}/api/projects/user/${userId}/inbox`;
    fetch(url, {
      method: 'GET',
    })
      .then((res) => processResponse(res))
      .then((data) => {
        currentProject.id = data.info._id;
        currentProject.project = data.info;
        Events.publish(EventTypes.changeProject, data.tasks);
      }).catch((err) => {
        console.log('Error getting user inbox');
        alert('Sorry, something went wrong while getting your inbox!');
      });
  };

  const deleteProject = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error('Response not ok!');
      }
      const matchFunc = (thisProject) => thisProject._id === projectId;

      CurrentProjectList.removeFirst(matchFunc);

      Events.publish(EventTypes.deleteProjectById, matchFunc);
      getUserInbox('testUser');
    }).catch((err) => {
      console.log('Error deleting project', err);
      alert('Sorry! Something went wrong while deleting this project!');
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
    checkServerStatus,
    createTask,
    getProjectTasks,
    getProjectList,
    deleteProject,
    getUserInbox,
  };
})();

export default ApiMessenger;
