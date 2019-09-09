import React from 'react';
import {Events, EventTypes, APIMessengerTypes} from '../../controllers/EventController';
import {CurrentProjectList, CurrentTaskList} from '../../controllers/InterfaceModel';
import Inbox from '../../objects/InboxProject';

function ProjectElement(props){
    const onProjectClick = (e) => {
        // Set CurrentTaskList's list to CurrentProjectList[i]
        //var targetList = props.project.tasks;
        /*if (targetList !== CurrentTaskList.getList()){
            //Events.publish(EventTypes.changeProject, targetList);
            
        }*/
        Events.publish(APIMessengerTypes.changeProject, props.project._id);
    }

    return (
        <span 
            className="project-element" 
            onClick={onProjectClick}
        >
            {props.project.name}
        </span>
    ); 
}

class ProjectListView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            viewList: CurrentProjectList.getList().slice(),
        }
        this.refresh = this.refresh.bind(this); 
    }

    componentDidMount(){
        Events.subscribe(EventTypes.addProject, this.refresh);
        Events.subscribe(EventTypes.changeProjectList, this.refresh);
    }

    componentWillUnmount(){
        Events.unsubscribe(EventTypes.addProject, this.refresh);
        Events.subscribe(EventTypes.changeProjectList, this.refresh);
    }

    refresh(){
        this.setState({
            viewList: CurrentProjectList.getList().slice(),
        });
    }

    render(){
        var projectElements = CurrentProjectList.getList().map((project) =>{
            return (
                <li key={project._id}>
                    <ProjectElement project={project} />
                </li>
            );
        });

        return (
            <div>
                <div id="inbox-project" className="project-element">
                    <ProjectElement project={Inbox}/>
                </div>
                <ul id="project-list">{projectElements}</ul>
            </div>
        );
    }
}

export default ProjectListView;