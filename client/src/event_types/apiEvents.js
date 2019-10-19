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
  signup: 'apiSignup',
  checkServerStatus: 'apiCheckServerStatus',
  changePassword: 'apiChangePassword',
  deleteAccount: 'apiDeleteAccount',
});

export default ApiEvents;
