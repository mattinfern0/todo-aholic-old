import {Events} from './EventController';
import {currentProject, CurrentProjectList} from './InterfaceModel';

import ApiEvents from '../event_types/apiEvents';
import ProjectEvents from '../event_types/projectEvents';
import TaskEvents from '../event_types/taskEvents';
import MiscEvents from '../event_types/miscEvents';
import { setToken, getToken, setCurrentUser, getCurrentUser } from './PersistentData';

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
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => processResponse(res))
      .then((data) => {
        Events.publish(TaskEvents.addTask, data.task);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
        }
        console.log('Error creating task: ', err);
        alert('Sorry! Something went wrong while creating your task!');
      });
  };

  const editTask = (updatedTask) => {
    const taskId = updatedTask._id;
    const url = `${backEndURL}/api/tasks/${taskId}`;
    const theBody = {task: updatedTask};
    console.log("edit task body", theBody);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
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

        Events.publish(TaskEvents.editTaskById, {matchFunc, modifyFunc});
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
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
        authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error('Res not ok');
      }
      console.log('DELETE result: ', res);
      const matchFunc = (thisTask) => thisTask._id === taskId;

      Events.publish(TaskEvents.deleteTaskById, matchFunc);
    }).catch((err) => {
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(MiscEvents.logout);
      }

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
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),
    }).then((res) => processResponse(res))
      .then((data) => {
        console.log('Create project res:', data);
        Events.publish(ProjectEvents.addProject, data.project);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
        }

        console.log('create project error: ', err);
        alert('Sorry! Something went wrong while creating your project!');
      });
  };

  const getProjectList = () => {
    const currentUser = getCurrentUser();
    const url = `${backEndURL}/api/projects/user/${currentUser._id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => processResponse(res))
      .then((data) => {
        Events.publish(ProjectEvents.changeProjectList, data.projects);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
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
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => processResponse(res))
      .then((data) => {
        currentProject.id = projectId;
        currentProject.project = data.info;
        Events.publish(ProjectEvents.changeProject, data.tasks);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
        }

        console.log('get project\'s tasks error: ', err);
        alert('Sorry! Something went wrong while getting this project\'s tasks!');
      });
  };

  const getUserInbox = () => {
    const userId = getCurrentUser()._id;

    const url = `${backEndURL}/api/projects/user/${userId}/inbox`;
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => processResponse(res))
      .then((data) => {
        Events.publish(ProjectEvents.selectProject, data.info);
        console.log('Sending change project to inbox event');
        Events.publish(ProjectEvents.changeProject, data.tasks);
      }).catch((err) => {
        if (err.message === '401') {
          alert('An error occured. Please log back in');
          return Events.publish(MiscEvents.logout);
        }
        
        console.log('Error getting user inbox');
        alert('Sorry, something went wrong while getting your inbox!');
      });
  };

  const editProject = (newProjectInfo) => {
    const url = `${backEndURL}/api/projects/${newProjectInfo._id}`;
    const theBody = {
      project: newProjectInfo,
    };
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(theBody),

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

      Events.publish(ProjectEvents.editProjectById, {matchFunc, modifyFunc});
    }).catch((err) => {
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(MiscEvents.logout);
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
        authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      if (!res.ok){
        console.log('Response not ok: ', res);
        throw new Error('Response not ok!');
      }
      const matchFunc = (thisProject) => thisProject._id === projectId;

      CurrentProjectList.removeFirst(matchFunc);

      Events.publish(ProjectEvents.deleteProjectById, matchFunc);
      getUserInbox('testUser');
    }).catch((err) => {
      if (err.message === '401') {
        alert('An error occured. Please log back in');
        return Events.publish(MiscEvents.logout);
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
        setToken(resBody.token);
        setCurrentUser(resBody.user);
        Events.publish(MiscEvents.login);
      })
      .catch((err) => {
        if (err.message === "401") {
          Events.publish(MiscEvents.loginFailed, "Invalid username or password");
        } else {
          Events.publish(MiscEvents.loginFailed, "An error occured. Please try again.");
        }
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

  const changePassword = (formData) => {
    const currentUserId = getCurrentUser()._id;
    const url = `${backEndURL}/api/users/${currentUserId}`;
    const theBody = {
      ...formData,
      _id: currentUserId,
    };

    return fetch(url, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theBody),
    })
      .then((res) => {
        res.json()
          .then((data) => {
            if (!res.ok){
              if (data.errors){
                const errorMessages = data.errors.map((v) => v.msg);
                Events.publish(MiscEvents.changePasswordAttempt, errorMessages);
              } else {
                Events.publish(MiscEvents.changePasswordAttempt, ['Unknown error']);
              }
            } else {
              setToken(data.token);
              Events.publish(MiscEvents.changePasswordAttempt, null);
            }
          });
      });
  };

  const deleteAccount = () => {
    const userId = getCurrentUser()._id;
    const url = `${backEndURL}/api/users/${userId}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        console.log(res);
        Events.publish(MiscEvents.deleteAccountAttempt, !res.ok);
      });
  };

  Events.subscribe(ApiEvents.addTask, createTask.bind(this));
  Events.subscribe(ApiEvents.editTask, editTask.bind(this));
  Events.subscribe(ApiEvents.deleteTask, deleteTask.bind(this));

  Events.subscribe(ApiEvents.addProject, createProject.bind(this));
  Events.subscribe(ApiEvents.editProject, editProject.bind(this));
  Events.subscribe(ApiEvents.changeProjectList, getProjectList.bind(this));
  Events.subscribe(ApiEvents.changeProject, getProjectTasks.bind(this));
  Events.subscribe(ApiEvents.removeProject, deleteProject.bind(this));
  Events.subscribe(ApiEvents.getInbox, getUserInbox.bind(this));

  Events.subscribe(ApiEvents.login, login.bind(this));
  Events.subscribe(ApiEvents.changePassword, changePassword);
  Events.subscribe(ApiEvents.deleteAccount, deleteAccount.bind(this));

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
