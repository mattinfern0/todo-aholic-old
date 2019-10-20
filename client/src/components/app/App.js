import React from 'react';

import AppHeader from './AppHeader';
import {ProjectsContainer} from './projects';
import {DetailsContainer} from './details';
import UnauthorizedListener from '../misc/UnauthorizedListener';
import {TasksContainer} from './tasks';

import { Events } from '../../controllers';
import {apiEvents} from '../../event_types';

class App extends React.Component {
  componentDidMount(){
    Events.publish(apiEvents.getInbox);
    Events.publish(apiEvents.changeProjectList);
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
