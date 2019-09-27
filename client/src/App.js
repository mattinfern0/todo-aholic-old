/* eslint-disable no-useless-constructor */
/* eslint-disable import/first */
import React from 'react';

import TaskListView from './components/app_view/tasks_view/TaskListView';
import NewTaskForm from './components/app_view/tasks_view/NewTaskForm';
import ProjectListView from './components/app_view/projects_view/ProjectListView';
import TaskDetailsView from './components/app_view/details_view/TaskDetailsView';
import ProjectHeader from './components/app_view/tasks_view/ProjectHeader';
import LogoutButton from './components/misc/LogoutButton';

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
        <header id="app-header">
          <span id="logo">
            <h1>ToDo-aholic</h1>
          </span>

          <LogoutButton />
        </header>
        <section id="content">
          <aside id="project-container">
            <ProjectListView />
          </aside>
          <section id="task-container">
            <ProjectHeader />
            <NewTaskForm />
            <TaskListView />
          </section>
          <aside id="details-container">
            <TaskDetailsView />
          </aside>
        </section>
      </div>
    );
  }
}

export default App;
