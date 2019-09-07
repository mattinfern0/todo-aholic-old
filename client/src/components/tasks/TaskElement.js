import React from 'react';
import {Events, EventTypes} from '../../controllers/EventController';
import {CurrentTaskList} from '../../controllers/InterfaceModel';
import moment from 'moment';

class TaskElement extends React.Component{
    constructor (props){
      super(props);
      this.state = {
        taskIndex: props.taskIndex, // <------ Not sure if this is needed
        editing: false,
      }
      this.onElementClick = this.onElementClick.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onCheck = this.onCheck.bind(this);
    }

    onCheck(e){
      var taskIndex = this.props.taskIndex;
      Events.publish(EventTypes.editTask, {
        index: taskIndex,
        modifyFunc: this._toggleComplete,
      });
    }

    onElementClick(e){
      var taskIndex = this.props.taskIndex;
      var currentTask = CurrentTaskList.getList()[taskIndex];
      Events.publish(EventTypes.getTaskDetail, currentTask);
    }

    onDelete(e){
      Events.publish(EventTypes.removeTask, this.props.taskIndex);
    }

    _toggleComplete(task){
      task.toggleComplete();
      return task;
    }

    _isToday(dateStr){
      var date = moment(dateStr);
      return date.isSame(moment().format(), 'day');
    }

    _getUIDate(dateStr){
      if (this._isToday(dateStr)){
        return "Today";
      } else {
        return moment(dateStr).format("MMM D");
      }
    }
  
    render(){
      var task = this.props.task;
  
      return (
        <div onClick={this.onElementClick}>
          <input 
            type="checkbox" 
            onChange={this.onCheck} 
            checked={task.completed}
          >
          </input>
          <span>{task.name}</span>
          <span className="task-right">
            <span className={this._isToday(task.dueDate)? "important": ""}>
              {this._getUIDate(task.dueDate)}
            </span>
            <button 
              className="delete-button" 
              onClick={this.onDelete}
            >
              Delete
            </button>
          </span>
        </div>
      );
    }
  }

  export default TaskElement;