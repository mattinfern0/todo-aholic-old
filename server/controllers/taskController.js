const mongoose = require('mongoose');
const Task = require('../models/task');


// Body must be in form of {task: <taskObject>}
// Response contains {newTask:<newTask>}
exports.createTask = (req, res, next) => {
  const reqTask = req.body.task;
  const newTask = new Task(
    {
      name: reqTask.name,
      dueDate: reqTask.dueDate,
      completed: false,
      project: reqTask.project,
      description: reqTask.description,
    },
  );

  newTask.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      return next(err);
    }
    return res.status(201).send({ task: newTask });
  });
};

exports.getAllTasks = (req, res, next) => {
  Task.find({}, (err, allTasks) => {
    if (err) {
      return next(err);
    }

    res.send(allTasks);
  });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body.task;

  if (mongoose.Types.ObjectId.isValid(taskId)) {
    Task.findByIdAndUpdate(taskId, updatedTask, (err, oldTask) => {
      if (err) {
        return next(err);
      }
      res.send({ oldTask });
    });
  } else {
    res.status(400).json({ message: 'Invalid task ID' });
  }
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  if (mongoose.Types.ObjectId.isValid(taskId)) {
    Task.findByIdAndDelete(taskId, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: `Successfully deleted task ${taskId}` });
    });
  } else {
    res.status(400).json({ message: 'Invalid task ID' });
  }
};
