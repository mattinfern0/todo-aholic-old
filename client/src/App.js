/* eslint-disable no-useless-constructor */
/* eslint-disable import/first */
import React from 'react';

import TaskListView from './components/tasks/TaskListView';
import NewTaskForm from './components/tasks/NewTaskForm';
import ProjectListView from './components/projects/ProjectListView';
import NewProjectForm from './components/projects/NewProjectForm';
import TaskDetailsView from './components/tasks/TaskDetailsView';
import ProjectHeader from './components/projects/ProjectHeader';
import LogoutButton from './components/misc/LogoutButton';

import {Events, APIMessengerTypes} from './controllers/EventController';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    Events.publish(APIMessengerTypes.getInbox);
    Events.publish(APIMessengerTypes.changeProjectList);
  }

  render() {
    return (
      <div id="app-container">
        <header id="app-header">
          <span>
            <h1>ToDo-aholic</h1>
          </span>

          <span className="task-right">
            <LogoutButton />
          </span>
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

/*
function App(){
  return (
    <div id="app-container">
      <header id="app-header">
        <h1>ToDo-aholic</h1>
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
} */

export default App;
