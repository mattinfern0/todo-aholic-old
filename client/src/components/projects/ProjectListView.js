import React from 'react';
import {Events} from '../../controllers/EventController';
import {CurrentProjectList} from '../../controllers/InterfaceModel';
import NewProjectForm from './NewProjectForm';
import ApiEvents from '../../event_types/apiEvents';
import ProjectEvents from '../../event_types/projectEvents';

function ProjectElement(props){
  const onProjectClick = (e) => {
    Events.publish(ApiEvents.changeProject, props.project._id);
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
      viewList: CurrentProjectList.getList().slice(),
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    Events.subscribe(ProjectEvents.projectListChanged, this.refresh);
    Events.subscribe(ProjectEvents.projectChanged, this.refresh);
  }

  componentWillUnmount(){
    Events.unsubscribe(ProjectEvents.projectListChanged, this.refresh);
    Events.unsubscribe(ProjectEvents.projectChanged, this.refresh);
  }

  refresh(){
    this.setState({
      viewList: CurrentProjectList.getList().slice(),
    });
  }

  render(){
    const projectElements = this.state.viewList.map((project) => (
      <li key={project._id}>
        <ProjectElement project={project} showDelete={this.state.editing} />
      </li>
    ));

    return (
      <div>
        <span>
          <h2>Projects</h2>
        </span>
        <div
          id="inbox-project"
          className="project-element"
          onClick={() => Events.publish(ApiEvents.getInbox, 'testUser')}
        >
          Inbox
        </div>
        <ul id="project-list">{projectElements}</ul>
        <NewProjectForm />
      </div>
    );
  }
}

export default ProjectListView;
