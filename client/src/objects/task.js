const Priority = Object.freeze({
    IMPORTANT: 1,
    TRIVIAL: 0
});

class Task{
    constructor(name, dueDate, description="", priority=Priority.TRIVIAL, completed=false, id=null){
        if (id === null){
            if (!Task.idTemp){
                Task.idTemp = 0;
            }
            Task.idTemp++;
            this.id = Task.idTemp;
        } else {
            this.id = id;
        }
        this.name = name;
        this.dueDate = dueDate // Expect dueDate to already be a Date object
        this.description = description;
        this.priority = priority;
        this.completed = completed;
        this.project = "";
    }

    toggleComplete(){
        this.completed = !this.completed;
    }

    clone(cloneId = false){
        var newTask = new Task(
            this.name, 
            this.dueDate, 
            this.description, 
            this.priority, 
            this.completed, 
        );

        if (cloneId){
            newTask.id = this.id;
        }
        
        return newTask;
    }
}

//export {Task, Priority};