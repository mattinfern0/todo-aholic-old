function notImplemented(res) {
  return res.send('Not implemented');
}

function onError(err, res, next) {
  res.send('Error');
  return next(err);
}

const Task = require('../models/task');

// Body must be in form of {task: <taskObject>}
// Response contains {newTask:<newTask>}
exports.createTask = (req, res, next) => {
  const reqTask = req.body.task;

  console.log('Adding task:', reqTask);
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
      console.log('Error: ', err);
      res.send('Error');
      return next(err);
    }
    console.log('Successfully added task');
    return res.send({ task: newTask });
  });
};

exports.getAllTasks = (req, res, next) => {
  Task.find({}, (err, allTasks) => {
    if (err) {
      console.log('Error: ', err);
      return next(err);
    }

    res.send(allTasks);
  });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body.task;

  Task.findByIdAndUpdate(taskId, updatedTask, (err, oldTask) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send({ oldTask });
  });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByIdAndDelete(taskId, (err) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send('Success');
  });
};
