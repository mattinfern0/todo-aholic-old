import React from 'react';
import moment from 'moment';

import {Events} from '../../controllers/EventController';
import PlaceholderDateInput from '../misc/PlaceholderDateInput';
import ApiEvents from '../../event_types/apiEvents';

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

    Events.publish(ApiEvents.addTask, newTaskInfo);
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
          className="input-name"
          type="text"
          placeholder="What do you want to do?"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />

        <PlaceholderDateInput
          className="input-date"
          placeholder="Due Date"
          value={this.state.dueDate}
          onChange={(e) => this.setState({ dueDate: e.target.value })}
        />
        <input
          className="button-add"
          type="submit"
          value="+"
        />
      </form>
    );
  }
}

export default NewTaskForm;
