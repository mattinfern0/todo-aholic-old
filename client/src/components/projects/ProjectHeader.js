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
          <h2>{this.state.project ? this.state.project.name : ''}</h2>
        </span>
        {this.state.project && this.state.project.name !== 'Inbox'
          && (
            <span>
              <button
                type="button"
                onClick={() => this.setState((prevState) => ({editing: prevState.editing}))}
              >
                Edit
              </button>
              <button 
                type="button"
                onClick={() => Events.publish(APIMessengerTypes.removeProject, this.state.project._id)}
              >
                Delete
              </button>
            </span>
          )
        }
      </header>
    );
  }
}

export default ProjectHeader;
