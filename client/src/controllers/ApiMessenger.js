import {Events} from './EventController';
import { apiEvents, projectEvents, taskEvents, miscEvents} from '../event_types';
import { setToken, getToken, setCurrentUser, getCurrentUser } from './PersistentData';
import { makeRequest } from '../utils';

const backEndURL = process.env.REACT_APP_BACKEND_URL;

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
    const addUrl = `${backEndURL}/api/tasks`;
    const theBody = {task: newTask};

    makeRequest(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          alert(result.err.message);
        } else {
          Events.publish(taskEvents.addTask, result.data.task);
        }
      });
  };

  const editTask = (updatedTask) => {
    const taskId = updatedTask._id;
    const url = `${backEndURL}/api/tasks/${taskId}`;
    const theBody = {task: updatedTask};

    makeRequest(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          alert(result.err.message);
        } else {
          Events.publish(taskEvents.editTaskById, updatedTask);
        }
      });
  };

  const deleteTask = (taskId) => {
    const url = `${backEndURL}/api/tasks/${taskId}`;
    makeRequest(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while deleting this task');
        } else {
          const matchFunc = (thisTask) => thisTask._id === taskId;
          Events.publish(taskEvents.removeTaskById, matchFunc);
        }
      });
  };

  const createProject = (newProject) => {
    const addUrl = `${backEndURL}/api/projects`;
    const theBody = {project: newProject};

    makeRequest(addUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while creating your project!');
        } else {
          Events.publish(projectEvents.addProject, result.data.project);
        }
      });
  };

  const getProjectList = () => {
    const currentUser = getCurrentUser();
    const url = `${backEndURL}/api/projects/user/${currentUser._id}`;

    makeRequest(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while getting your projects');
        } else {
          Events.publish(projectEvents.changeProjectList, result.data.projects);
        }
      });
  };

  const getProjectTasks = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;

    makeRequest(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while getting this project\'s tasks!');
        } else {
          Events.publish(projectEvents.changeProject, result.data);
        }
      });
  };

  const getUserInbox = () => {
    const userId = getCurrentUser()._id;

    const url = `${backEndURL}/api/projects/user/${userId}/inbox`;

    makeRequest(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry, something went wrong while getting your inbox!');
        } else {
          Events.publish(projectEvents.changeProject, result.data);
        }
      });
  };

  const editProject = (newProjectInfo) => {
    const url = `${backEndURL}/api/projects/${newProjectInfo._id}`;
    const theBody = {
      project: newProjectInfo,
    };

    makeRequest(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while editing this project!');
        } else {
          Events.publish(projectEvents.editProjectById, newProjectInfo);
        }
      });
  };

  const deleteProject = (projectId) => {
    const url = `${backEndURL}/api/projects/${projectId}`;

    makeRequest(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        if (result.err) {
          alert('Sorry! Something went wrong while deleting this project!');
        } else {
          const matchFunc = (thisProject) => thisProject._id === projectId;
          Events.publish(projectEvents.deleteProjectById, matchFunc);
          getUserInbox();
        }
      });
  };

  const login = (credentials) => {
    const url = `${backEndURL}/api/users/login`;
    const theBody = { username: credentials.username, password: credentials.password };

    makeRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          if (result.err.status === 401) {
            Events.publish(miscEvents.loginFailed, "Invalid username or password");
          } else {
            Events.publish(miscEvents.loginFailed, "An error occured. Please try again.");
          }
        } else {
          // Store access token in local storage
          setToken(result.data.token);
          setCurrentUser(result.data.user);
          Events.publish(miscEvents.login);
        }
      });
  };

  const signup = (credentials) => {
    const url = `${backEndURL}/api/users`;
    makeRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((result) => {
        if (result.err) {
          Events.publish(miscEvents.signupFailed, result.data.errors);
        } else {
          Events.publish(miscEvents.signupSuccess);
        }
      });
  };

  const changePassword = (formData) => {
    const currentUserId = getCurrentUser()._id;
    const url = `${backEndURL}/api/users/${currentUserId}`;
    const theBody = {
      ...formData,
      _id: currentUserId,
    };

    makeRequest(url, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((result) => {
        if (result.err) {
          if (result.data && result.data.errors) {
            const errorMessages = result.data.errors.map((v) => v.msg);
            Events.publish(miscEvents.changePasswordAttempt, errorMessages);
          } else {
            Events.publish(miscEvents.changePasswordAttempt, ['Unknown error']);
          }
        } else {
          setToken(result.data.token);
          Events.publish(miscEvents.changePasswordAttempt, null);
        }
      });
  };

  const deleteAccount = () => {
    const userId = getCurrentUser()._id;
    const url = `${backEndURL}/api/users/${userId}`;

    makeRequest(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((result) => {
        Events.publish(miscEvents.deleteAccountAttempt, result.err);
      });
  };

  Events.subscribe(apiEvents.addTask, createTask.bind(this));
  Events.subscribe(apiEvents.editTask, editTask.bind(this));
  Events.subscribe(apiEvents.deleteTask, deleteTask.bind(this));

  Events.subscribe(apiEvents.addProject, createProject.bind(this));
  Events.subscribe(apiEvents.editProject, editProject.bind(this));
  Events.subscribe(apiEvents.changeProjectList, getProjectList.bind(this));
  Events.subscribe(apiEvents.changeProject, getProjectTasks.bind(this));
  Events.subscribe(apiEvents.removeProject, deleteProject.bind(this));
  Events.subscribe(apiEvents.getInbox, getUserInbox.bind(this));

  Events.subscribe(apiEvents.login, login.bind(this));
  Events.subscribe(apiEvents.signup, signup.bind(this));
  Events.subscribe(apiEvents.changePassword, changePassword);
  Events.subscribe(apiEvents.deleteAccount, deleteAccount.bind(this));

  return {
    checkServerStatus,
    createTask,
    getProjectTasks,
    getProjectList,
    deleteProject,
    getUserInbox,
    signup,
    changePassword,
  };
})();

export default ApiMessenger;
