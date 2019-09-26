import ObserverList from '../objects/observerList';
import ProjectEvents from '../event_types/projectEvents';
import TaskEvents from '../event_types/taskEvents';

const CurrentTaskList = new ObserverList({
  addEvent: TaskEvents.addTask,
  editFirstEvent: TaskEvents.editTaskById,
  changeListEvent: ProjectEvents.changeProject,
  removeFirstEvent: TaskEvents.deleteTaskById,

  listChangedEvent: TaskEvents.taskListChanged,
  itemChangedEvent: TaskEvents.taskChanged,
});

const CurrentProjectList = new ObserverList({
  addEvent: ProjectEvents.addProject,
  editFirstEvent: ProjectEvents.editProjectById,
  removeFirstEvent: ProjectEvents.removeProjectById,
  changeListEvent: ProjectEvents.changeProjectList,

  listChangedEvent: ProjectEvents.projectListChanged,
  itemChangedEvent: ProjectEvents.projectChanged,
});

const currentProject = {id: null, project: null };

export {CurrentTaskList, CurrentProjectList, currentProject};
