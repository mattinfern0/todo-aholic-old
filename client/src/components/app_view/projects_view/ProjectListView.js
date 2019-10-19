import React from 'react';
import {Events} from '../../../controllers/EventController';
import NewProjectForm from './NewProjectForm';
import ApiEvents from '../../../event_types/apiEvents';
import ProjectEvents from '../../../event_types/projectEvents';
import { removeFirst } from '../../../utils';
import { projectEvents } from '../../../event_types';


function ProjectElement(props){
  const onProjectClick = (e) => {
    Events.publish(ApiEvents.changeProject, props.project._id);
    Events.publish(ProjectEvents.selectProject, props.project);
  };

  return (
    <span>
      <span className="project-element" onClick={onProjectClick}>
        {props.project.name}
      </span>
    </span>
  );
}

class ProjectListView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projectList: [],
    };

    this.addProject = this.addProject.bind(this);
    this.removeFirst = this.removeFirst.bind(this);
    this.changeProjectList = this.changeProjectList.bind(this);
  }

  componentDidMount(){
    Events.subscribe(ProjectEvents.addProject, this.addProject);
    Events.subscribe(ProjectEvents.deleteProjectById, this.removeFirst);
    Events.subscribe(projectEvents.changeProjectList, this.changeProjectList);
  }

  componentWillUnmount(){
    Events.unsubscribe(ProjectEvents.addProject, this.addProject);
    Events.unsubscribe(ProjectEvents.deleteProjectById, this.removeFirst);
    Events.unsubscribe(projectEvents.changeProjectList, this.changeProjectList);
  }

  addProject(item){
    console.log('adding');
    console.log('after', this.state.projectList);
  }

  removeFirst(testFunc) {
    this.setState((prevState) => {
      const projects = prevState.projectList;
      removeFirst(projects, testFunc);
      return { projectList: projects };
    });
  }

  changeProjectList(newList) {
    this.setState({ projectList: newList });
  }

  render(){
    const projectElements = this.state.projectList.map((project) => (
      <li key={project._id}>
        <ProjectElement project={project} showDelete={this.state.editing} />
      </li>
    ));

    return (
      <div>
        <h2>Projects</h2>
        <div
          id="inbox-project"
          className="project-element"
          onClick={() => Events.publish(ApiEvents.getInbox)}
        >
          Inbox
        </div>
        <hr />
        <ul id="project-list">{projectElements}</ul>
        <hr />
        <NewProjectForm />
      </div>
    );
  }
}

export default ProjectListView;
