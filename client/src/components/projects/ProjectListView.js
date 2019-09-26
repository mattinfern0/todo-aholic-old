import React from 'react';
import {Events, EventTypes, APIMessengerTypes} from '../../controllers/EventController';
import {CurrentProjectList} from '../../controllers/InterfaceModel';
import NewProjectForm from './NewProjectForm';

function ProjectElement(props){
  const onProjectClick = (e) => {
    Events.publish(APIMessengerTypes.changeProject, props.project._id);
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
    Events.subscribe(EventTypes.addProject, this.refresh);
    Events.subscribe(EventTypes.changeProjectList, this.refresh);
    Events.subscribe(EventTypes.deleteProjectById, this.refresh);
    Events.subscribe(EventTypes.editProjectById, this.refresh);
  }

  componentWillUnmount(){
    Events.unsubscribe(EventTypes.addProject, this.refresh);
    Events.unsubscribe(EventTypes.changeProjectList, this.refresh);
    Events.unsubscribe(EventTypes.deleteProjectById, this.refresh);
    Events.unsubscribe(EventTypes.editProjectById, this.refresh);
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
          onClick={() => Events.publish(APIMessengerTypes.getInbox, 'testUser')}
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
