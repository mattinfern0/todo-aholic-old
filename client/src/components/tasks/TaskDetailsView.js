/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';
import { Events } from '../../controllers/EventController';
import TaskEvents from '../../event_types/taskEvents';
import ProjectEvents from '../../event_types/projectEvents';
import ApiEvents from '../../event_types/apiEvents';

import EditTaskForm from './EditTaskForm';

class TaskDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      currentTask: null, // Reference to the currentTask to watch
      taskInfo: null,
    };
    this.refresh = this.refresh.bind(this);
    this.setCurrentTask = this.setCurrentTask.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    Events.subscribe(TaskEvents.getTaskDetail, this.setCurrentTask);
    Events.subscribe(TaskEvents.deleteTaskById, this.onDelete);

    Events.subscribe(TaskEvents.taskChanged, this.refresh);
    Events.subscribe(ProjectEvents.projectChanged, this.onProjectChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTask !== prevState.currentTask) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    Events.unsubscribe(TaskEvents.getTaskDetail, this.setCurrentTask);
    Events.unsubscribe(TaskEvents.deleteTaskById, this.onDelete);

    Events.unsubscribe(TaskEvents.taskChanged, this.refresh);
    Events.unsubscribe(ProjectEvents.projectChanged, this.onProjectChange);
  }

  setCurrentTask(task) {
    if (!this.state.editing) {
      this.setState({ currentTask: task });
    }
  }

  onDelete(matchFunc) {
    if (matchFunc(this.state.currentTask)) {
      this.setState({ currentTask: null });
      this.refresh();
    }
  }

  refresh() {
    if (this.state.currentTask != null) {
      // Clones the object using json
      this.setState((prevState) => ({
        taskInfo: JSON.parse(JSON.stringify(prevState.currentTask)),
      }));
    } else {
      this.setState({ taskInfo: null });
    }
  }

  onProjectChange() {
    this.setState({ currentTask: null });
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
