import React from 'react';
import moment from 'moment';

import {Events } from '../../../controllers/EventController';
import ApiEvents from '../../../event_types/apiEvents';
import TaskEvents from '../../../event_types/taskEvents';

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
    Events.publish(ApiEvents.editTask, updatedTask);
  }

  onElementClick(e){
    Events.publish(TaskEvents.getTaskDetail, this.props.task);
  }

  onDelete(e){
    Events.publish(ApiEvents.deleteTask, this.props.task._id);
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
        <span className="align-right">
          <span className={TaskElement._isToday(task.dueDate) ? 'important' : ''}>
            {TaskElement._getUIDate(task.dueDate)}
          </span>
        </span>
      </div>
    );
  }
}

export default TaskElement;
