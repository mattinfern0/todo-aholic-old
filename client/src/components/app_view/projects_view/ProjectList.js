import React from 'react';
import {Events} from '../../../controllers/EventController';
import { projectEvents, apiEvents } from '../../../event_types';

export default function ProjectList(props) {
  const createClickFunc = (project) => () => {
    Events.publish(apiEvents.changeProject, project._id);
    Events.publish(projectEvents.selectProject, project);
  };

  const projectElements = props.projectList.map((project) => (
    <li
      key={project._id}
      onClick={createClickFunc(project)}
      className="project-element"
    >
      {project.name}
    </li>
  ));

  return (
    <ul id="project-list">
      {projectElements}
    </ul>
  );
}
