/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';
import { Events, EventTypes, APIMessengerTypes } from '../../controllers/EventController';
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
    // Place subscriptions here according to the docs
    Events.subscribe(EventTypes.editTaskById, this.refresh);
    Events.subscribe(EventTypes.getTaskDetail, this.setCurrentTask);
    Events.subscribe(EventTypes.changeProject, this.onProjectChange);
    Events.subscribe(EventTypes.deleteTaskById, this.onDelete);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTask !== prevState.currentTask) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    Events.unsubscribe(EventTypes.editTaskById, this.refresh);
    Events.unsubscribe(EventTypes.getTaskDetail, this.setCurrentTask);
    Events.unsubscribe(EventTypes.changeProject, this.onProjectChange);
    Events.unsubscribe(EventTypes.deleteTaskById, this.onDelete);
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
      // this.setState({taskInfo: this.state.currentTask.clone(true)});

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
          <div>
            <span><h2>{taskInfo.name ? taskInfo.name : 'No Name'}</h2></span>
            <button
              type="button"
              className="edit-button task-right"
              onClick={(e) => this.setState({ editing: true })}
            />

            <div>
              <h3>
                Due: {moment(taskInfo.dueDate).format('MMMM D')}
              </h3>
            </div>
          </div>
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
            className="delete-button"
            onClick={() => Events.publish(APIMessengerTypes.deleteTask, this.state.taskInfo._id)}
          />
        </span>
      );
    }
  }
}

export default TaskDetailsView;
