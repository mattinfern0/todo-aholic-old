/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';
import { Events } from '../../../controllers/EventController';
import TaskEvents from '../../../event_types/taskEvents';
import ProjectEvents from '../../../event_types/projectEvents';
import ApiEvents from '../../../event_types/apiEvents';

import EditTaskForm from './EditTaskForm';

class TaskDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      currentTask: null, // Reference to the currentTask to watch
      taskInfo: null,
    };
    this.setTaskInfo = this.setTaskInfo.bind(this);
    this.updateTaskInfo = this.updateTaskInfo.bind(this);
    this.clearInfo = this.clearInfo.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    Events.subscribe(TaskEvents.selectTask, this.setTaskInfo);
    Events.subscribe(TaskEvents.editTaskById, this.updateTaskInfo);
    Events.subscribe(TaskEvents.deleteTaskById, this.onDelete);

    Events.subscribe(ProjectEvents.changeProject, this.clearInfo);
  }

  componentWillUnmount() {
    Events.unsubscribe(TaskEvents.selectTask, this.setTaskInfo);
    Events.unsubscribe(TaskEvents.editTaskById, this.updateTaskInfo);
    Events.unsubscribe(TaskEvents.deleteTaskById, this.onDelete);

    Events.unsubscribe(ProjectEvents.changeProject, this.clearInfo);
  }

  setTaskInfo(task) {
    if (!this.state.editing) {
      this.setState({ taskInfo: task });
    }
  }

  updateTaskInfo(newInfo) {
    this.setState({ taskInfo: newInfo });
  }

  onDelete(matchFunc) {
    if (matchFunc(this.state.currentTask)) {
      this.clearInfo();
    }
  }

  clearInfo() {
    this.setState({ taskInfo: null });
  }

  render() {
    const taskInfo = this.state.taskInfo;
    if (taskInfo == null) {
      return (
        <h2>Click On A Task</h2>
      );
    } else if (this.state.editing) {
      return (
        <EditTaskForm
          initialTaskInfo={taskInfo}
          revertFunc={() => { this.setState({ editing: false }); }}
        />
      );
    } else {
      return (
        <span>
          <header>
            <h2>{taskInfo.name ? taskInfo.name : 'No Name'}</h2>
            <button
              type="button"
              className="button-edit align-right"
              onClick={(e) => this.setState({ editing: true })}
            />
          </header>
          <p>
            Due: {moment(taskInfo.dueDate).format('MMMM D')}
          </p>
          <div className="description">
            <p>
              {
                taskInfo.description.length > 0
                  ? taskInfo.description
                  : 'No Description'
              }
            </p>
          </div>
          <button
            type="button"
            className="button-delete align-right"
            onClick={() => Events.publish(ApiEvents.deleteTask, this.state.taskInfo._id)}
          />
        </span>
      );
    }
  }
}

export default TaskDetailsView;
