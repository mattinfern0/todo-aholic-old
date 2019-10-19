import {Events} from '../controllers/EventController';
import {projectEvents, taskEvents } from '../event_types';
import ListUpdater from '../objects/listUpdater';

const appState = {
  currentTaskList: [],
  currentProjectList: [],
  selectedTask: null,
};

const taskListListeners = {
  add: taskEvents.addTask,
  removeFirst: taskEvents.removeTaskById,
  editFirst: taskEvents.editTaskById,
  changeList: projectEvents.changeProject,
};

const projectListListeners = {
  add: projectEvents.addProject,
  removeFirst: projectEvents.deleteProjectById,
  editFirst: projectEvents.editProjectById,
  changeList: projectEvents.changeProjectList,
};

Events.subscribe(taskEvents.selectTask, (task) => {
  appState.selectedTask = task;
});

export default appState;
