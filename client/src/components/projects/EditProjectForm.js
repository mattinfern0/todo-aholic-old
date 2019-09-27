import React from 'react';
import {Events} from '../../controllers/EventController';
import ApiEvents from '../../event_types/apiEvents';

// Props:
// initialProjectInfo, revertFunc
class EditProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: this.props.initialProjectInfo.name,
    };
    this.editProject = this.editProject.bind(this);
  }

  editProject(e) {
    const editedProject = {
      name: this.state.projectName,
      _id: this.props.initialProjectInfo._id,
    };

    Events.publish(ApiEvents.editProject, editedProject);
    this.props.revertFunc();
    e.preventDefault();
  }

  render() {
    return (
      <form autoComplete="off" onSubmit={this.editProject}>
        <input
          className="input-name"
          type="text"
          value={this.state.projectName}
          onChange={(e) => this.setState({ projectName: e.target.value })}
        />
        <input
          type="submit"
          value="Save"
        />
      </form>
    );
  }
}

export default EditProjectForm;
