import React from 'react';
import {Events, EventTypes} from '../../controllers/EventController';
import {Task} from '../../objects/task';
import PlaceholderDateInput from '../misc/PlaceholderDateInput'
import moment from 'moment';

class NewTaskForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            dueDate: "",
            dateInputType: "text"
        }
        this.createTask = this.createTask.bind(this);
    }

    parseDateStr(dateStr){
        var date = moment(dateStr, "YYYY-MM-DD");
        if (date.isValid()){
            return date.format();
        } else {
            return moment().format();
        }
    }

    createTask(e){
        var dueDate = this.parseDateStr(this.state.dueDate);
        var newTask = new Task(this.state.name, dueDate);
        Events.publish(EventTypes.addTask, newTask);
        this.resetForm();
        e.preventDefault();
    }

    resetForm(){
        this.setState({
            name: "",
            dueDate: "",
        })
    }

    render(){
        return (
            <form 
                id={"new-task"} 
                autoComplete="off" 
                onSubmit={this.createTask}
            >
                <input id="new-task-name" 
                    type={"text"} 
                    placeholder={"What do you want to do?"}
                    value={this.state.name} 
                    onChange={(e) => this.setState({name: e.target.value})}
                >
                </input>

                <PlaceholderDateInput
                    class="new-task-date" 
                    placeholder="Due Date"
                    value={this.state.dueDate}
                    onChange={(e) => this.setState({dueDate: e.target.value})}
                />
                <input type="submit" value="+"></input>
            </form>
        );
    }
}

export default NewTaskForm;