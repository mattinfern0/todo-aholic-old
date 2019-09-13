/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import moment from 'moment';

import {Events, EventTypes, APIMessengerTypes} from '../../controllers/EventController';

class TaskElement extends React.Component{
  /*
      Props:
        taskIndex
        task
    */
  constructor(props){
    super(props);
    this.state = {
      className: '',
    };
    this.onElementClick = this.onElementClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCheck = this.onCheck.bind(this);

    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
  }

  onCheck(e){
    const updatedTask = JSON.parse(JSON.stringify(this.props.task));
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
    this.setState({className: 'selected'});
  }

  onDeselect(e){
    this.setState({className: ''});
  }

  static _toggleComplete(task){
    task.toggleComplete();
    return task;
  }

  static _isToday(dateStr){
    const date = moment(dateStr);
    return date.isSame(moment().format(), 'day');
  }

  static _getUIDate(dateStr){
    if (TaskElement._isToday(dateStr)){
      return 'Today';
    } else {
      return moment(dateStr).format('MMM D');
    }
  }

  render(){
    const task = this.props.task;

    return (
      <div
        onClick={this.onElementClick}
        className={this.state.className}
        onFocus={this.onSelect}
        onBlur={this.onDeselect}
      >
        <input
          type="checkbox"
          onChange={this.onCheck}
          checked={task.completed}
        />
        <span>{task.name}</span>
        <span className="task-right">
          <span className={TaskElement._isToday(task.dueDate) ? 'important' : ''}>
            {TaskElement._getUIDate(task.dueDate)}
          </span>
          <button
            type="button"
            className="delete-button"
            // onClick={this.onDelete}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default TaskElement;
