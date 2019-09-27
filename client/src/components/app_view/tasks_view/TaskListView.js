import React from 'react';
import {Events} from '../../../controllers/EventController';
import TaskElement from './TaskElement';
import {CurrentTaskList} from '../../../controllers/InterfaceModel';
import TaskEvents from '../../../event_types/taskEvents';

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
    Events.subscribe(TaskEvents.taskListChanged, this.refreshTasks);
    Events.subscribe(TaskEvents.taskChanged, this.refreshTasks);
  }

  componentWillUnmount(){
    Events.unsubscribe(TaskEvents.taskListChanged, this.refreshTasks);
    Events.unsubscribe(TaskEvents.taskChanged, this.refreshTasks);
  }

  refreshTasks(){
    this.setState({
      viewList: CurrentTaskList.getList().slice(),
    });
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
        <h3>Add Some Tasks!</h3>
      );
    } else {
      return (
        <span>
          {onGoing.length > 0
            && <ul id="ongoing" className="task-list">{onGoing}</ul>
          }
          {completed.length > 0 // Separated because i don't want to wrap them in a container tag
            && <h3>Completed</h3>
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
