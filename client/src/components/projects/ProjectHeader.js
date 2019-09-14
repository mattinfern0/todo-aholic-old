/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {currentProject} from '../../controllers/InterfaceModel';
import {Events, EventTypes, APIMessengerTypes} from '../../controllers/EventController';

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
    Events.subscribe(EventTypes.changeProject, this.refresh);
  }

  refresh(){
    this.setState({ project: (currentProject.project) });
  }

  render() {
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
                onClick={() => this.setState((prevState) => ({editing: prevState.editing}))}
              />
              <button
                type="button"
                className="delete-button"
                onClick={() => Events.publish(APIMessengerTypes.removeProject,
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
