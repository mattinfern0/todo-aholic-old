import React from 'react'
import moment from 'moment';
import {Events, EventTypes} from '../../controllers/EventController'
import EditTaskForm from './EditTaskForm';

class TaskDetailsView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            currentTask: null, // Reference to the currentTask to watch
            taskInfo: null,
        }
        this.refresh = this.refresh.bind(this);
        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.onProjectChange = this.onProjectChange.bind(this);
    }

    componentDidMount(){
        // Place subscriptions here according to the docs
        Events.subscribe(EventTypes.editTaskById, this.refresh);
        Events.subscribe(EventTypes.getTaskDetail, this.setCurrentTask);
        Events.subscribe(EventTypes.changeProject, this.onProjectChange);
    }

    componentWillUnmount(){
        Events.unsubscribe(EventTypes.editTaskById, this.refresh);
        Events.unsubscribe(EventTypes.getTaskDetail, this.setCurrentTask);
        Events.unsubscribe(EventTypes.changeProject, this.onProjectChange);
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.currentTask !== prevState.currentTask){
            this.refresh();
        }
    }

    setCurrentTask(task){
        this.setState({currentTask: task});
    }

    refresh(){
        if (this.state.currentTask != null){
            this.setState({taskInfo: this.state.currentTask.clone(true)});
        } else {
            this.setState({taskInfo: null});
        }
    }

    onProjectChange(){
        console.log("Setting current task to null")
        this.setState({currentTask: null});
    }

    render(){
        var taskInfo = this.state.taskInfo;
        if (taskInfo == null){
            return (
                <h2>Click On A Task</h2>
            )
        } else if (this.state.editing){
            return (
                <EditTaskForm 
                    initialTaskInfo={taskInfo} 
                    revertFunc={() => {this.setState({editing: false})}}
                />
            )
        } else {
            return (
                <span>
                    <div>
                        <span><h2>{taskInfo.name}</h2></span>
                        <button id="edit-button" 
                            onClick={(e) => this.setState({editing: true})}
                        >
                            Edit
                        </button>

                        <div><h3>Due: {moment(taskInfo.dueDate).format("MMMM D")}</h3></div>
                    </div>
                    <div className="description">
                        <p>
                            {
                                taskInfo.description.length > 0 
                                ? taskInfo.description 
                                : "No Description"
                            }
                        </p>  
                    </div>
                </span>
            );
        }
    }
}

export default TaskDetailsView;