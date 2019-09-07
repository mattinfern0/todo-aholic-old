import React from 'react';
import {Events, EventTypes} from '../../controllers/EventController'
import TaskElement from './TaskElement';
import {CurrentTaskList} from '../../controllers/InterfaceModel';

class TaskListView extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        viewList: CurrentTaskList.getList().slice() // Copy of project's tasks array for immutability principle?
      }

      this.refreshTasks = this.refreshTasks.bind(this);
    }

    componentDidMount(){
      Events.subscribe(EventTypes.addTask, this.refreshTasks);
      Events.subscribe(EventTypes.removeTask, this.refreshTasks);
      Events.subscribe(EventTypes.editTask, this.refreshTasks);
      Events.subscribe(EventTypes.changeProject, this.refreshTasks);
      Events.subscribe(EventTypes.editTaskById, this.refreshTasks);
    }

    componentWillMount(){
      Events.unsubscribe(EventTypes.addTask, this.refreshTasks);
      Events.unsubscribe(EventTypes.removeTask, this.refreshTasks);
      Events.unsubscribe(EventTypes.editTask, this.refreshTasks);
      Events.unsubscribe(EventTypes.changeProject, this.refreshTasks);
      Events.unsubscribe(EventTypes.editTaskById, this.refreshTasks);
    }
  
    refreshTasks(){
      this.setState({
        viewList:CurrentTaskList.getList().slice(),
      });
    }
  
    render(){
      var viewList = this.state.viewList;
      var onGoing = []
      var completed = []

      for (let i = viewList.length - 1; i >= 0; i--){
          let newElement = (
            <li className="task-item" key={viewList[i].id}>
              <TaskElement task={viewList[i]} taskIndex={i} />
            </li>);
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
              {onGoing.length > 0 &&
                <ul id="ongoing" className="task-list">{onGoing}</ul>
              }
              {completed.length > 0 && // Separated because i don't want to wrap them in a container tag
                <h4>Completed</h4>
              }
              {completed.length > 0 &&
                <ul id="completed" className="task-list">{completed}</ul> 
              }
          </span>
        );
      }  
    }
  }

  export default TaskListView;