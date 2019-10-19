import React from 'react';
import TaskListView from './TaskList';
import ProjectHeader from './ProjectHeader';
import NewTaskForm from './NewTaskForm';
import { removeFirst, editFirst } from '../../../utils';
import { Events } from '../../../controllers/EventController';
import { projectEvents, taskEvents } from '../../../event_types';

class TasksView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {name: '', id: null},
      projectTasks: [],
    };

    this.addTask = this.addTask.bind(this);
    this.editTargetTask = this.editTargetTask.bind(this);
    this.removeTargetTask = this.removeTargetTask.bind(this);
    this.changeProject = this.changeProject.bind(this);
    this.editProjectInfo = this.editProjectInfo.bind(this);
  }

  componentDidMount() {
    Events.subscribe(taskEvents.addTask, this.addTask);
    Events.subscribe(taskEvents.editTaskById, this.editTargetTask);
    Events.subscribe(taskEvents.removeTaskById, this.removeTargetTask);
    Events.subscribe(projectEvents.changeProject, this.changeProject);
    Events.subscribe(projectEvents.editProjectById, this.editProjectInfo);
  }

  componentWillUnmount() {
    Events.unsubscribe(taskEvents.addTask, this.addTask);
    Events.unsubscribe(taskEvents.editTaskById, this.editTargetTask);
    Events.unsubscribe(taskEvents.removeTaskById, this.removeTargetTask);
    Events.unsubscribe(projectEvents.changeProject, this.changeProject);
  }

  changeProject(newProject) {
    this.setState({
      projectInfo: newProject.info,
      projectTasks: newProject.tasks,
    });
  }

  addTask(newTask){
    this.setState((prevState) => (
      { projectTasks: prevState.projectTasks.concat([newTask])}
    ));
  }

  removeTargetTask(targetFunc) {
    this.setState((prevState) => {
      const tasks = JSON.parse(JSON.stringify(prevState.projectTasks));
      removeFirst(tasks, targetFunc);
      return { projectTasks: tasks };
    });
  }

  editTargetTask(newInfo) {
    const targetFunc = (task) => newInfo._id === task._id;
    const modifyFunc = () => newInfo;
    this.setState((prevState) => {
      const tasks = JSON.parse(JSON.stringify(prevState.projectTasks));
      console.log('editTasks: ', tasks);
      editFirst(tasks, targetFunc, modifyFunc);
      return { projectTasks: tasks };
    });
  }

  editProjectInfo(newInfo) {
    this.setState({ projectInfo: newInfo });
  }

  render() {
    return (
      <section id="task-container">
        <ProjectHeader projectInfo={this.state.projectInfo} />
        <NewTaskForm projectInfo={this.state.projectInfo} />
        <TaskListView taskList={this.state.projectTasks} />
      </section>
    );
  }
}

export default TasksView;
