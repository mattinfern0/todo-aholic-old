import React from 'react';
import moment from 'moment';
import {Events, APIMessengerTypes} from '../../controllers/EventController'
import PlaceholderDateInput from '../misc/PlaceholderDateInput'

class EditTaskForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: props.initialTaskInfo.name,
            dueDate: props.initialTaskInfo.dueDate,
            description: props.initialTaskInfo.description,
        }
        this.doSubmit = this.doSubmit.bind(this);
    }

    parseDateStr(dateStr){
        var date = moment(dateStr, "YYYY-MM-DD");
        if (date.isValid()){
            return date.format();
        } else {
            return this.props.task.dueDate;
        }
    }

    doSubmit(e){
        var dueDate = this.parseDateStr(this.state.dueDate);
        

        var updateTask = JSON.parse(JSON.stringify(this.props.initialTaskInfo));
        updateTask.name = this.state.name;
        updateTask.dueDate = dueDate;
        updateTask.description = this.state.description;
        console.log(updateTask);

        /*
        var matchFunc = (thisTask) => {
            return thisTask.id === this.props.initialTaskInfo.id;
        }
        var modifyFunc = (task) => {
            task.name = this.state.name;
            task.dueDate = dueDate;
            task.description = this.state.description;
            return task;
        }


        Events.publish(EventTypes.editTaskById,{matchFunc, modifyFunc});*/
        Events.publish(APIMessengerTypes.editTask, updateTask);
        this.props.revertFunc();
        e.preventDefault();
    }

    render(){
        return (
            <form autoComplete="off" onSubmit={this.doSubmit}>
                <div>
                    <input 
                        id="edit-task-name"
                        type="text" 
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

                    
                    <input type="submit" id="edit-button" value="Save"></input>
                </div>
                <div>
                    <textarea
                        value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}
                        placeholder="Description"
                    >
                    </textarea>
                </div>
            </form>
        );
    }
}

export default EditTaskForm;