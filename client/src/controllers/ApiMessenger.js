import Cookies from 'universal-cookie';
import {Events, EventTypes, APIMessengerTypes} from './EventController';
import {currentProject, CurrentProjectList} from './InterfaceModel';

const cookies = new Cookies();
const backEndURL = process.env.REACT_APP_BACKEND_URL;

function processResponse(res){
  if (!res.ok){
    console.log('Bad response: ', res);

    throw new Error(res.status);
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
            throw new Error(res.status);
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
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => processResponse(res))
      .then((data) => {
        console.log('create task response: ', data);
        Events.publish(EventTypes.addTask, data.task);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }
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
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }
        console.log('Error editing task: ', err);
        alert('Sorry, something went wrong while modifying your task!');
      });
  };

  const deleteTask = (taskId) => {
    const url = `${backEndURL}/api/tasks/${taskId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error('Res not ok');
      }
      console.log('DELETE result: ', res);
      const matchFunc = (thisTask) => thisTask._id === taskId;

      Events.publish(EventTypes.deleteTaskById, matchFunc);
    }).catch((err) => {
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(EventTypes.logout);
      }

      console.log('delete task error: ', err);
      alert('Sorry! Something went wrong while deleting this task!');
    });
  };

  const createProject = (newProject) => {
    const addUrl = `${backEndURL}/api/projects`;
    const theBody = {project: newProject};
    console.log(theBody);

    fetch(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(theBody),
    }).then((res) => processResponse(res))
      .then((data) => {
        console.log('Create project res:', data);
        Events.publish(EventTypes.addProject, data.project);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }

        console.log('create project error: ', err);
        alert('Sorry! Something went wrong while creating your project!');
      });
  };

  const getProjectList = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const url = `${backEndURL}/api/projects/user/${currentUser._id}`;
    console.log(url);

    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => processResponse(res))
      .then((data) => {
        Events.publish(EventTypes.changeProjectList, data.projects);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }

        console.log('get all projects error: ', err);
        alert('Sorry! Something went wrong while getting your projects!');
      });
  };

  const getProjectTasks = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => processResponse(res))
      .then((data) => {
        currentProject.id = projectId;
        currentProject.project = data.info;
        Events.publish(EventTypes.changeProject, data.tasks);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }

        console.log('get project\'s tasks error: ', err);
        alert('Sorry! Something went wrong while getting this project\'s tasks!');
      });
  };

  const getUserInbox = () => {
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    const url = `${backEndURL}/api/projects/user/${userId}/inbox`;
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => processResponse(res))
      .then((data) => {
        currentProject.id = data.info._id;
        currentProject.project = data.info;
        Events.publish(EventTypes.changeProject, data.tasks);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(EventTypes.logout);
        }
        
        console.log('Error getting user inbox');
        alert('Sorry, something went wrong while getting your inbox!');
      });
  };

  const editProject = (newProjectInfo) => {
    const url = `${backEndURL}/api/projects/${newProjectInfo._id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: {
        project: JSON.stringify(newProjectInfo),
      },

    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error(res.status);
      }

      const matchFunc = (thisProject) => thisProject._id === newProjectInfo._id;
      const modifyFunc = (project) => {
        const newProject = JSON.parse(JSON.stringify(newProjectInfo));
        return newProject;
      };

      Events.publish(EventTypes.editProjectById, {matchFunc, modifyFunc});
    }).catch((err) => {
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(EventTypes.logout);
      }
      console.log('Error editing project', err);
      alert('Sorry! Something went wrong while editing this project!');
    });
  };

  const deleteProject = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
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
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(EventTypes.logout);
      }
      console.log('Error deleting project', err);
      alert('Sorry! Something went wrong while deleting this project!');
    });
  };

  const login = (credentials) => {
    const url = `${backEndURL}/api/users/login`;
    const theBody = { username: credentials.username, password: credentials.password };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => processResponse(res))
      .then((resBody) => {
        // Store access token in local storage
        localStorage.setItem('accessToken', resBody.token);
        localStorage.setItem('currentUser', JSON.stringify(resBody.user));
        console.log("Token: ", localStorage.getItem('accessToken'));
        Events.publish(EventTypes.login);
      })
      .catch((err) => {
        console.log('Error logging in: ', err);
        alert('Sorry! Something went wrong while logging in!');
      });
  };

  const signup = (credentials) => {
    const url = `${backEndURL}/api/users`;
    return (
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => {
          if (!res.ok){
            throw (res);
          }
        })
    );
  };

  Events.subscribe(APIMessengerTypes.addTask, createTask.bind(this));
  Events.subscribe(APIMessengerTypes.editTask, editTask.bind(this));
  Events.subscribe(APIMessengerTypes.deleteTask, deleteTask.bind(this));

  Events.subscribe(APIMessengerTypes.addProject, createProject.bind(this));
  Events.subscribe(APIMessengerTypes.editProject, editProject.bind(this));
  Events.subscribe(APIMessengerTypes.changeProjectList, getProjectList.bind(this));
  Events.subscribe(APIMessengerTypes.changeProject, getProjectTasks.bind(this));
  Events.subscribe(APIMessengerTypes.removeProject, deleteProject.bind(this));
  Events.subscribe(APIMessengerTypes.getInbox, getUserInbox.bind(this));

  Events.subscribe(APIMessengerTypes.login, login.bind(this));

  return {
    checkServerStatus,
    createTask,
    getProjectTasks,
    getProjectList,
    deleteProject,
    getUserInbox,
    signup,
  };
})();

export default ApiMessenger;
