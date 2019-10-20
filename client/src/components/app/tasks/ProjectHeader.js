import React from 'react';
import {Events} from '../../../controllers/EventController';
import EditProjectForm from '../projects/EditProjectForm';
import ApiEvents from '../../../event_types/apiEvents';

class ProjectHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    if (this.state.editing) {
      return (
        <EditProjectForm
          revertFunc={() => this.setState({ editing: false})}
          initialProjectInfo={this.props.projectInfo}
        />
      );
    }
    return (
      <header>
        <h2>{this.props.projectInfo ? this.props.projectInfo.name : ''}</h2>
        {this.props.projectInfo && this.props.projectInfo.name !== 'Inbox'
          && (
            <span className="align-right">
              <button
                type="button"
                className="button-edit"
                onClick={() => this.setState({editing: true })}
              />
              <button
                type="button"
                className="button-delete"
                onClick={() => Events.publish(ApiEvents.removeProject,
                  this.props.projectInfo._id)}
              />
            </span>
          )
        }
      </header>
    );
  }
}

export default ProjectHeader;
