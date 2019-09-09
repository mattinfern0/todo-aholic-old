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
    removeEvent: EventTypes.removeProject,
    changeListEvent: EventTypes.changeProjectList,
});

const currentProject = {id: null};

export {CurrentTaskList, CurrentProjectList, currentProject};
