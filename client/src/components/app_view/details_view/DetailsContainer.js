/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';
import { Events } from '../../../controllers/EventController';
import { taskEvents, projectEvents} from '../../../event_types';
import ApiEvents from '../../../event_types/apiEvents';
import TaskDetails from './TaskDetails';

import EditTaskForm from './EditTaskForm';

class TaskDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      taskInfo: null,
    };
    this.setTaskInfo = this.setTaskInfo.bind(this);
    this.updateTaskInfo = this.updateTaskInfo.bind(this);
    this.clearInfo = this.clearInfo.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    Events.subscribe(taskEvents.selectTask, this.setTaskInfo);
    Events.subscribe(taskEvents.editTaskById, this.updateTaskInfo);
    Events.subscribe(taskEvents.removeTaskById, this.onDelete);

    Events.subscribe(projectEvents.changeProject, this.clearInfo);
  }

  componentWillUnmount() {
    Events.unsubscribe(taskEvents.selectTask, this.setTaskInfo);
    Events.unsubscribe(taskEvents.editTaskById, this.updateTaskInfo);
    Events.unsubscribe(taskEvents.removeTaskById, this.onDelete);

    Events.unsubscribe(projectEvents.changeProject, this.clearInfo);
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
    if (this.state.taskInfo && matchFunc(this.state.taskInfo)) {
      this.clearInfo();
    }
  }

  clearInfo() {
    this.setState({ taskInfo: null });
  }

  render() {
    const taskInfo = this.state.taskInfo;
    let toRender = null;
    if (taskInfo == null) {
      toRender = (
        <h2>Click On A Task</h2>
      );
    } else if (this.state.editing) {
      toRender = (
        <EditTaskForm
          initialTaskInfo={taskInfo}
          revertFunc={() => { this.setState({ editing: false }); }}
        />
      );
    } else {
      toRender = (
        <TaskDetails 
          onEditClick={(e) => this.setState({ editing: true })}
          taskInfo={this.state.taskInfo}
        />
      );
    }

    return (
      <aside id="details-container">
        {toRender}
      </aside>
    );
  }
}

export default TaskDetailsView;
