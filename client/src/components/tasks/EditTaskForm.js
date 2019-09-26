import React from 'react';
import moment from 'moment';
import { Events } from '../../controllers/EventController';
import PlaceholderDateInput from '../misc/PlaceholderDateInput';
import ApiEvents from '../../event_types/apiEvents';

class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.initialTaskInfo.name,
      dueDate: props.initialTaskInfo.dueDate,
      description: props.initialTaskInfo.description,
    };
    this.doSubmit = this.doSubmit.bind(this);
  }

  parseDateStr(dateStr) {
    const date = moment(dateStr, 'YYYY-MM-DD');
    if (date.isValid()) {
      return date.format();
    }
    return this.props.task.dueDate;
  }

  doSubmit(e) {
    const dueDate = this.parseDateStr(this.state.dueDate);


    const updateTask = JSON.parse(JSON.stringify(this.props.initialTaskInfo));
    updateTask.name = this.state.name;
    updateTask.dueDate = dueDate;
    updateTask.description = this.state.description;

    this.props.revertFunc();
    Events.publish(ApiEvents.editTask, updateTask);
    e.preventDefault();
  }

  render() {
    return (
      <form autoComplete="off" onSubmit={this.doSubmit}>
        <div>
          <input
            id="edit-task-name"
            type="text"
            value={this.state.name}
            placeholder="Name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />

          <PlaceholderDateInput
            class="new-task-date"
            placeholder="Due Date"
            value={this.state.dueDate}
            onChange={(e) => this.setState({ dueDate: e.target.value })}
          />

          <input type="submit" id="edit-button" value="Save" />
        </div>
        <div>
          <textarea
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Description"
          />
        </div>
      </form>
    );
  }
}

export default EditTaskForm;
