import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
import {Task} from './objects/task';
import {Project} from './objects/project';
import {Events, EventTypes} from './controllers/EventController';
import {CurrentProjectList, CurrentTaskList} from './controllers/InterfaceModel'
import Inbox from './objects/InboxProject'*/

import ApiMessenger from './controllers/ApiMessenger'

// Setup defaults
//CurrentProjectList.add(new Project("Example Project"));
//var startingProject = Inbox;
//CurrentTaskList.setList(startingProject.tasks);
//Events.publish(EventTypes.addTask, new Task("Example task", new Date().toISOString()));
ApiMessenger.getProjectTasks("random")

ReactDOM.render(<App/>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
