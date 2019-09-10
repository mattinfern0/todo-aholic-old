
const mongoose = require('mongoose');
const async = require('async');

const Project = require('../models/project');
const Task = require('../models/task');

function notImplemented(res) {
  return res.send('Not implemented');
}

function onError(err, res, next) {
  console.log('ERROR: ', err);
  res.send('Error');
  return next(err);
}

exports.createProject = (req, res, next) => {
  const reqProject = req.body.project;

  const newProject = new Project(
    {
      name: reqProject.name,
    },
  );

  newProject.save((err) => {
    if (err) {
      return onError(err, res, next);
    }

    return res.send(newProject);
  });

  console.log('Successfully added project');
};

exports.getAllProjects = (req, res, next) => {
  Project.find({}, (err, allProjects) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send({ projects: allProjects });
  });
};

exports.getProjectInfo = (req, res, next) => {
  const targetId = req.params.projectId;
  console.log('getting project info for id: ', targetId);
  async.parallel({
    info: (callback) => {
      Project.findById(targetId, callback);
    },
    tasks: (callback) => {
      Task.find({ project: mongoose.Types.ObjectId(targetId) }, callback);
    },
  }, (err, results) => {
    if (err) {
      return onError(err, res, next);
    }

    console.log('getProjectInfo success');
    res.send({ info: results.info, tasks: results.tasks });
  });
};

exports.updateProject = (req, res, next) => {
  const projectId = req.params.projectId;
  const updatedProject = req.body.project;

  console.log('Updating id: ', projectId);
  console.log('The new project: ', updatedProject);

  Project.findByIdAndUpdate(projectId, updatedProject, (err, oldProject) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send({ oldProject });
  });
};

exports.deleteProject = (req, res, next) => {
  const projectId = req.params.projectId;
  Project.findByIdAndDelete(projectId, (err) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send('Success');
  });
};

exports.getProjectTasks = (req, res, next) => {
  const projectId = req.params.projectId;

  Task.find({ project: projectId }, (err, results) => {
    if (err) {
      return onError(err, res, next);
    }

    res.send(results);
  });
};
