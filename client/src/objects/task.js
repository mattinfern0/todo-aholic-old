const Priority = Object.freeze({
  IMPORTANT: 1,
  TRIVIAL: 0,
});

class Task{
  constructor(name, dueDate, description = '', priority = Priority.TRIVIAL, completed = false){
    this.name = name;
    this.dueDate = dueDate; // Expect dueDate to already be a Date object
    this.description = description;
    this.priority = priority;
    this.completed = completed;
    this.project = '';
  }
}

export {Task, Priority};
