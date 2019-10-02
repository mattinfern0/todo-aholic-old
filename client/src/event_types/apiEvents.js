const ApiEvents = Object.freeze({
  addTask: 'apiAddTask',
  deleteTask: 'apiRemoveTask',
  editTask: 'apiEditTask',

  addProject: 'apiAddProject',
  editProject: 'apiEditProject',
  removeProject: 'apiRemoveProject',
  changeProject: 'apiChangeProject',
  changeProjectList: 'apiChangeProjectList',

  getInbox: 'apiGetInbox',

  login: 'apiLogin',
  checkServerStatus: 'apiCheckServerStatus',
  changePassword: 'apiChangePassword',
});

export default ApiEvents;
