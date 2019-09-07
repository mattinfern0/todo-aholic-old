import {ObserverList} from '../objects/observerList';
import {EventTypes} from './EventController';

const CurrentTaskList = new ObserverList({
    addEvent: EventTypes.addTask, 
    removeEvent: EventTypes.removeTask,
    editEvent: EventTypes.editTask,
    editFirstEvent: EventTypes.editTaskById,
    changeListEvent: EventTypes.changeProject,
});

const CurrentProjectList = new ObserverList({
    addEvent: EventTypes.addProject, 
    removeEvent: EventTypes.removeProject
});

export {CurrentTaskList, CurrentProjectList};
