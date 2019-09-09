import React from 'react';
import {Events, EventTypes, APIMessengerTypes} from '../../controllers/EventController';
import moment from 'moment';

class TaskElement extends React.Component{
    /*
      Props:
        taskIndex
        task
    */
    constructor (props){
      super(props);
      this.state = {
        taskIndex: props.taskIndex, // <------ Not sure if this is needed
        className: ""
      }
      this.onElementClick = this.onElementClick.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onCheck = this.onCheck.bind(this);

      this.onSelect = this.onSelect.bind(this);
      this.onDeselect = this.onDeselect.bind(this);
    }

    onCheck(e){
      var updatedTask = JSON.parse(JSON.stringify(this.props.task));
      updatedTask.completed = !updatedTask.completed;
      Events.publish(APIMessengerTypes.editTask, updatedTask);
    }

    onElementClick(e){
      Events.publish(EventTypes.getTaskDetail, this.props.task);
    }

    onDelete(e){
      Events.publish(APIMessengerTypes.deleteTask, this.props.task._id);
    }

    onSelect(e){
      this.setState({className: "selected"})
    }

    onDeselect(e){
      this.setState({className: ""})
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
        <div onClick={this.onElementClick} className={this.state.className} onFocus={this.onSelect} onBlur={this.onDeselect}>
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