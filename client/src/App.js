import React from 'react';

import AppHeader from './components/app_view/AppHeader';
import ProjectsContainer from './components/app_view/projects_view/ProjectsContainer';
import DetailsContainer from './components/app_view/details_view/DetailsContainer';
import UnauthorizedListener from './components/misc/UnauthorizedListener';
import TasksContainer from './components/app_view/tasks_view/TasksContainer';

import {Events} from './controllers/EventController';
import ApiEvents from './event_types/apiEvents';

class App extends React.Component {
  componentDidMount(){
    Events.publish(ApiEvents.getInbox);
    Events.publish(ApiEvents.changeProjectList);
  }

  render() {
    return (
      <div id="app-container">
        <UnauthorizedListener />

        <AppHeader />
        <section id="content">
          <ProjectsContainer />
          <TasksContainer />
          <DetailsContainer />
        </section>
      </div>
    );
  }
}

export default App;
