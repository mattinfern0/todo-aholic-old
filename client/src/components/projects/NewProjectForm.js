import React from 'react';
import {Events, EventTypes} from '../../controllers/EventController';
import {Project} from '../../objects/project';

class NewProjectForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projectName: '',
    };
    this.createProject = this.createProject.bind(this);
  }

  createProject(e){
    if (this.state.projectName.length > 0){
      const newProject = new Project(this.state.projectName);
      Events.publish(EventTypes.addProject, newProject);
    }

    this.resetForm();
    e.preventDefault();
  }

  resetForm(){
    this.setState({
      projectName: '',
    });
  }

  render(){
    return (
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
        <input type="submit" value="+" />
      </form>
    );
  }
}

export default NewProjectForm;
