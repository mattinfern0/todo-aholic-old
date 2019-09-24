import React from 'react';
import {Events, EventTypes} from '../../controllers/EventController';
import TaskElement from './TaskElement';
import {CurrentTaskList} from '../../controllers/InterfaceModel';

class TaskListView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // Copy of project's tasks array for immutability principle?
      viewList: CurrentTaskList.getList().slice(),
    };

    this.refreshTasks = this.refreshTasks.bind(this);
  }

  componentDidMount(){
    Events.subscribe(EventTypes.addTask, this.refreshTasks);
    Events.subscribe(EventTypes.removeTask, this.refreshTasks);
    Events.subscribe(EventTypes.editTask, this.refreshTasks);
    Events.subscribe(EventTypes.changeProject, this.refreshTasks);
    Events.subscribe(EventTypes.editTaskById, this.refreshTasks);
    Events.subscribe(EventTypes.deleteTaskById, this.refreshTasks);
  }

  componentWillUnmount(){
    Events.unsubscribe(EventTypes.addTask, this.refreshTasks);
    Events.unsubscribe(EventTypes.removeTask, this.refreshTasks);
    Events.unsubscribe(EventTypes.editTask, this.refreshTasks);
    Events.unsubscribe(EventTypes.changeProject, this.refreshTasks);
    Events.unsubscribe(EventTypes.editTaskById, this.refreshTasks);
    Events.unsubscribe(EventTypes.deleteTaskById, this.refreshTasks);
  }

  refreshTasks(){
    this.setState({
      viewList: CurrentTaskList.getList().slice(),
    });
    console.log(this.state.viewList);
  }

  render(){
    const viewList = this.state.viewList;
    const onGoing = [];
    const completed = [];

    for (let i = viewList.length - 1; i >= 0; i--){
      const newElement = (
        <li className="task-item" key={viewList[i]._id}>
          <TaskElement task={viewList[i]} taskIndex={i} />
        </li>
      );
      if (viewList[i].completed){
        completed.push(newElement);
      } else {
        onGoing.push(newElement);
      }
    }

    if (onGoing.length === 0 && completed.length === 0){
      return (
        <h4>Add Some Tasks!</h4>
      );
    } else {
      return (
        <span>
          {onGoing.length > 0
            && <ul id="ongoing" className="task-list">{onGoing}</ul>
          }
          {completed.length > 0 // Separated because i don't want to wrap them in a container tag
            && <h4>Completed</h4>
          }
          {completed.length > 0
            && <ul id="completed" className="task-list">{completed}</ul>
          }
        </span>
      );
    }
  }
}

export default TaskListView;
