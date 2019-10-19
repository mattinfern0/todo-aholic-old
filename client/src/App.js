/* eslint-disable no-useless-constructor */
/* eslint-disable import/first */
import React from 'react';

import AppHeader from './components/app_view/AppHeader';
import ProjectListView from './components/app_view/projects_view/ProjectListView';
import TaskDetailsView from './components/app_view/details_view/TaskDetailsView';
import UnauthorizedListener from './components/misc/UnauthorizedListener';
import TaskView from './components/app_view/tasks_view/TasksView';

import {Events} from './controllers/EventController';
import ApiEvents from './event_types/apiEvents';

class App extends React.Component {
  constructor(props){
    super(props);
  }

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
          <aside id="project-container">
            <ProjectListView />
          </aside>
          <TaskView />
          <aside id="details-container">
            <TaskDetailsView />
          </aside>
        </section>
      </div>
    );
  }
}

export default App;
