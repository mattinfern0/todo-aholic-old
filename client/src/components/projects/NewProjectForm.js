import React from 'react';
import {Events} from '../../controllers/EventController';
import ApiEvents from '../../event_types/apiEvents';

class NewProjectForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      projectName: '',
    };
    this.createProject = this.createProject.bind(this);
  }

  createProject(e){
    if (this.state.projectName.length > 0){
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const newProjectInfo = {
        name: this.state.projectName,
        owner: currentUser._id,
      };

      Events.publish(ApiEvents.addProject, newProjectInfo);
    }

    this.resetForm();
    this.setState((prevState) => ({showForm: !prevState.showForm}));
    e.preventDefault();
  }

  resetForm(){
    this.setState({
      projectName: '',
    });
  }

  render(){
    return (
      <div id="new-project-form-container">
        {!this.state.showForm
        && (
          <span onClick={() => this.setState((prevState) => ({showForm: !prevState.showForm}))}>
            New Project
          </span>
        )
        }
        {this.state.showForm
        && (
          <form
            id="new-project"
            autoComplete="off"
            onSubmit={this.createProject}
          >
            <input
              onChange={(e) => this.setState({projectName: e.target.value})}
              type="text"
              placeholder="Project Name"
              value={this.state.projectName}
              id="new-project-name"
            />
            <input
              type="submit"
              value="+"
              className="add-button"
            />
          </form>
        )
        }
      </div>
    );
  }
}

export default NewProjectForm;
