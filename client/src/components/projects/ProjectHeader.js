/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {currentProject} from '../../controllers/InterfaceModel';
import {Events} from '../../controllers/EventController';
import EditProjectForm from './EditProjectForm';
import ApiEvents from '../../event_types/apiEvents';
import ProjectEvents from '../../event_types/projectEvents';

class ProjectHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      project: (currentProject.project),
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    Events.subscribe(ProjectEvents.projectChanged, this.refresh);
    Events.subscribe(ProjectEvents.changeProject, this.refresh);
  }

  componentWillUnmount() {
    Events.unsubscribe(ProjectEvents.changeProject, this.refresh);
    Events.unsubscribe(ProjectEvents.projectChanged, this.refresh);
  }

  refresh(){
    this.setState({ project: (currentProject.project) });
  }

  render() {
    if (this.state.editing) {
      return (
        <EditProjectForm 
          revertFunc={() => this.setState({ editing: false})}
          initialProjectInfo={this.state.project}
        />
      );
    }
    return (
      <header>
        <span>
          <h5>{this.state.project ? this.state.project.name : ''}</h5>
        </span>
        {this.state.project && this.state.project.name !== 'Inbox'
          && (
            <span className="task-right">
              <button
                type="button"
                className="edit-button"
                onClick={() => this.setState({editing: true })}
              />
              <button
                type="button"
                className="delete-button"
                onClick={() => Events.publish(ApiEvents.removeProject,
                  this.state.project._id)}
              />
            </span>
          )
        }
      </header>
    );
  }
}

export default ProjectHeader;
