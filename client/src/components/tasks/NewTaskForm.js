import React from 'react';
import moment from 'moment';

import { Events, APIMessengerTypes } from '../../controllers/EventController';
import PlaceholderDateInput from '../misc/PlaceholderDateInput';
import ApiMessenger from '../../controllers/ApiMessenger';

function parseDateStr(dateStr) {
  const date = moment(dateStr, 'YYYY-MM-DD');
  if (date.isValid()) {
    return date.format();
  }
  return moment().format();
}

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dueDate: '',
    };
    this.createTask = this.createTask.bind(this);
  }

  createTask(e) {
    const dueDate = parseDateStr(this.state.dueDate);
    const newTaskInfo = {
      name: this.state.name,
      dueDate,
    };
    // const newTask = new Task(this.state.name, dueDate);

    Events.publish(APIMessengerTypes.addTask, newTaskInfo);
    this.resetForm();
    e.preventDefault();
  }

  resetForm() {
    this.setState({
      name: '',
      dueDate: '',
    });
  }

  render() {
    return (
      <form
        id="new-task"
        autoComplete="off"
        onSubmit={this.createTask}
      >
        <input
          id="new-task-name"
          type="text"
          placeholder="What do you want to do?"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />

        <PlaceholderDateInput
          class="new-task-date"
          placeholder="Due Date"
          value={this.state.dueDate}
          onChange={(e) => this.setState({ dueDate: e.target.value })}
        />
        <input
          className="add-button"
          type="submit"
          value="+"
        />
      </form>
    );
  }
}

export default NewTaskForm;
