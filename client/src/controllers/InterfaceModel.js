import {ObserverList} from '../objects/observerList';
import {EventTypes} from './EventController';

const CurrentTaskList = new ObserverList({
  addEvent: EventTypes.addTask,
  removeEvent: EventTypes.removeTask,
  editEvent: EventTypes.editTask,
  editFirstEvent: EventTypes.editTaskById,
  changeListEvent: EventTypes.changeProject,
  removeFirstEvent: EventTypes.deleteTaskById,
});

const CurrentProjectList = new ObserverList({
  addEvent: EventTypes.addProject,
  editFirstEvent: EventTypes.editProjectById,
  removeEvent: EventTypes.removeProject,
  removeFirstEvent: EventTypes.removeProjectById,
  changeListEvent: EventTypes.changeProjectList,
});

const currentProject = {id: null, project: null };

export {CurrentTaskList, CurrentProjectList, currentProject};
