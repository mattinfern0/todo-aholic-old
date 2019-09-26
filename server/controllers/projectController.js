
const mongoose = require('mongoose');
const async = require('async');

const Project = require('../models/project');
const Task = require('../models/task');

exports.createProject = (req, res, next) => {
  const reqProject = req.body.project;

  const newProject = new Project(
    {
      name: reqProject.name,
      owner: reqProject.owner,
    },
  );

  newProject.save((err) => {
    if (err) {
      return next(err);
    }

    return res.status(201).send({ project: newProject });
  });
};

exports.getProjectInfo = (req, res, next) => {
  const targetId = req.params.projectId;
  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }
  async.parallel({
    info: (callback) => {
      Project.findById(targetId, callback);
    },
    tasks: (callback) => {
      Task.find({ project: mongoose.Types.ObjectId(targetId) }, callback);
    },
  }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.send({ info: results.info, tasks: results.tasks });
  });
};

exports.updateProject = (req, res, next) => {
  const projectId = req.params.projectId;
  const updatedProject = req.body.project;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  Project.findByIdAndUpdate(projectId, updatedProject, (err, oldProject) => {
    if (err) {
      return next(err);
    }

    res.send({ oldProject });
  });
};

exports.deleteProject = (req, res, next) => {
  const projectId = req.params.projectId;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  async.parallel({
    infoResult: (callback) => {
      Project.findByIdAndDelete(projectId, callback);
    },
    tasksResult: (callback) => {
      // Delete the tasks associated with that project
      Task.deleteMany({ project: mongoose.Types.ObjectId(projectId) }, callback);
    },
  }, (err) => {
    if (err) {
      return next(err);
    }

    res.status(204).json({ message: `Successfully deleted project ${projectId}` });
  });
};

exports.getProjectTasks = (req, res, next) => {
  const projectId = req.params.projectId;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  Task.find({ project: projectId }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.send(results);
  });
};

exports.getUserInbox = (req, res, next) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  Project.findOne({ name: 'Inbox', owner: mongoose.Types.ObjectId(userId) }, (err, result) => {
    if (err) {
      return next(err);
    }
    // Create a new inbox for the user if it doesn't exist, otherwise send current one
    if (!result) {
      console.log("This user's inbox doesn't exist. Creating new one");
      const newInbox = new Project(
        {
          name: 'Inbox',
          owner: userId,
        },
      );

      newInbox.save((err) => {
        if (err) {
          return next(err);
        }

        return res.send({ info: newInbox, tasks: [] });
      });
    } else {
      const inboxInfo = result;
      Task.find({ project: mongoose.Types.ObjectId(inboxInfo._id) }, (error, tasksResult) => {
        if (error) {
          return next(err);
        }
        res.send({ info: inboxInfo, tasks: tasksResult });
      });
    }
  });
};

exports.getUserProjects = (req, res, next) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  Project.find({ owner: mongoose.Types.ObjectId(userId), name: { $ne: 'Inbox' } }, (err, projects) => {
    if (err) {
      return next(err);
    }

    return res.send({ projects });
  });
};
