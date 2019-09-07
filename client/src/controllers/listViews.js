import {TaskList} from "../objects/task";
import {ProjectList} from "../objects/project"
import {EventAggregator, Events} from "../controllers/eventController"
import * as moment from "../libs/moment/moment"

// COmpares 2 moment objects
function isToday(moment1,){
    let today = moment()
    return (moment1.date() === today.date() 
        && moment1.month() === today.month()
        && moment1.year() === today.year())
}

const TaskListView = ((tasks) => {
    var listElement = document.getElementById("ongoing-list");
    var completedList = document.getElementById("completed-list");

    var onDeleteClick = (e) =>{
        
        var taskIndex = e.target.parentElement.parentElement.dataset.taskIndex
        EventAggregator.runEvent(Events.removeTask, taskIndex);
    }
    
    var onCheckClick = (e) => {
        var taskIndex = e.target.parentElement.dataset.taskIndex
        let toggleComplete = (task) => {
            task.toggleComplete();
            return task;
        }
        EventAggregator.runEvent(Events.editTask, {index: taskIndex, modifyFunc: toggleComplete});
    }

    var newTaskElement = (task) =>{
        var newTask = document.createElement('li');
        var completeButton = document.createElement('input');

        completeButton.setAttribute("type", "checkbox");
        completeButton.onclick = onCheckClick;
        completeButton.checked = task.completed;
        newTask.appendChild(completeButton);
        
        var title = document.createElement('span');
        title.innerText = task.name;
        newTask.appendChild(title);


        var rightSpan = document.createElement('span');
        var date = document.createElement('span');
        if (isToday(task.dueDate)){
            date.innerText = "Today"
            date.classList.add('important');
        } else {
            date.innerText = task.dueDate.format("MMM D");
        }
        
        rightSpan.appendChild(date);

        var deleteButton = document.createElement('button');
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = onDeleteClick;

        rightSpan.appendChild(deleteButton);
        rightSpan.classList.add("task-right");
        newTask.appendChild(rightSpan);

        newTask.classList.add("task-item");
        return newTask;
    }

    var clearElementChildren = (element) => {
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    var refresh = () =>{
        clearElementChildren(listElement);
        clearElementChildren(completedList);

        let allTasks = tasks.getList();
        for (let i = allTasks.length - 1; i >= 0; i--){
            let resultElement = newTaskElement(allTasks[i]);
            resultElement.dataset.taskIndex = i;
            if (allTasks[i].completed){
                completedList.appendChild(resultElement)
            } else {
                listElement.appendChild(resultElement);
            }
        }
    }

    const changeProject = (project) => {
       tasks.setList(project.tasks);
       tasks.printList();
       refresh();
   }

   EventAggregator.addEventHandler(Events.addTask, refresh);
   EventAggregator.addEventHandler(Events.removeTask, refresh);
   EventAggregator.addEventHandler(Events.editTask, refresh);  
   EventAggregator.addEventHandler(Events.changeProject, changeProject);

   return {changeProject}
})(TaskList);

const ProjectListView = ((projectList) => {
    var listElement = document.getElementById("project-list");

    const onProjectClick = (e) =>{
        var projectIndex = e.target.dataset.projectIndex;
        EventAggregator.runEvent(Events.changeProject, projectList.getList()[projectIndex]);
    }

    const refresh = () => {
        while (listElement.firstChild){
            listElement.removeChild(listElement.firstChild);
        }

        var projects = projectList.getList();
        for (let i = 0; i < projects.length; i++){
            let newLi = document.createElement("li");
            newLi.innerText = projects[i].name;
            newLi.dataset.projectIndex = i;
            newLi.onclick = onProjectClick;

            listElement.appendChild(newLi);
        }
    }

    EventAggregator.addEventHandler(Events.addProject, refresh);
    EventAggregator.addEventHandler(Events.removeProject, refresh);
    
    return {}
})(ProjectList);

export {TaskListView, ProjectListView}