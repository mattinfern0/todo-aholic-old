import React from 'react';
// import './App.css';

import TaskListView from './components/tasks/TaskListView';
import NewTaskForm from './components/tasks/NewTaskForm';
import ProjectListView from './components/projects/ProjectListView';
import NewProjectForm from './components/projects/NewProjectForm';
import TaskDetailsView from './components/tasks/TaskDetailsView';
import ProjectHeader from './components/projects/ProjectHeader';


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
}

export default App;
