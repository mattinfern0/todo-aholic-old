import React from 'react';
import {Events} from '../../../controllers/EventController';
import NewProjectForm from './NewProjectForm';
import ProjectList from './ProjectList';
import { removeFirst, editFirst } from '../../../utils';
import { projectEvents, apiEvents } from '../../../event_types';

class ProjectsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projectList: [],
    };

    this.addProject = this.addProject.bind(this);
    this.editTargetProject = this.editTargetProject.bind(this);
    this.removeFirst = this.removeFirst.bind(this);
    this.changeProjectList = this.changeProjectList.bind(this);
  }

  componentDidMount(){
    Events.subscribe(projectEvents.addProject, this.addProject);
    Events.subscribe(projectEvents.editProjectById, this.editTargetProject);
    Events.subscribe(projectEvents.deleteProjectById, this.removeFirst);
    Events.subscribe(projectEvents.changeProjectList, this.changeProjectList);
  }

  componentWillUnmount(){
    Events.unsubscribe(projectEvents.addProject, this.addProject);
    Events.unsubscribe(projectEvents.editProjectById, this.editTargetProject);
    Events.unsubscribe(projectEvents.deleteProjectById, this.removeFirst);
    Events.unsubscribe(projectEvents.changeProjectList, this.changeProjectList);
  }

  addProject(newProject){
    this.setState((prevState) => (
      { projectList: prevState.projectList.concat([newProject])}
    ));
  }

  editTargetProject(newInfo) {
    const targetFunc = (project) => project._id === newInfo._id;
    const modifyFunc = () => newInfo;
    this.setState((prevState) => {
      const projects = JSON.parse(JSON.stringify(prevState.projectList));
      editFirst(projects, targetFunc, modifyFunc);
      return { projectList: projects };
    });
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

  render() {
    return (
      <aside id="project-container">
        <h2>Projects</h2>
        <div
          id="inbox-project"
          className="project-element"
          onClick={() => Events.publish(apiEvents.getInbox)}
        >
          Inbox
        </div>
        <hr />
        <ProjectList projectList={this.state.projectList} />
        <hr />
        <NewProjectForm />
      </aside>
    );
  }
}

export default ProjectsContainer;
