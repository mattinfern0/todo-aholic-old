const Project = require('../models/project');
const Task = require('../models/task');
const async = require('async');
const mongoose = require('mongoose');

function notImplemented(res){
    return res.send("Not implemented");
}

exports.createProject = (req, res, next) => {
    var reqProject = req.body.project;

    var newProject = new Project(
        {
            name: reqProject.name
        }
    );

    newProject.save(function (err){
        if (err){
            console.log("Error: ", err);
            res.send("Error");
            return next(err);
        }

        return res.send(newProject);
    });

    console.log("Successfully added project");
}

exports.getAllProjects = (req, res, next) => {
    Project.find({}, function(err, allProjects){
        if (err){
            console.log(err);
            res.send("Error");
            return next(err);
        }

        res.send(allProjects);
    });
}

exports.getProjectInfo = (req, res, next) => {
    var targetId = req.params.projectId
    async.parallel({
            info: function(callback){
                Project.findById(targetId, callback);
            },
            tasks: function(callback){
                Task.find({project: mongoose.Types.ObjectId(targetId)}, callback);
            }
        }, function (err, results){
            if (err){
                console.log(err);
                res.send("Error");
                return next(err);
            }

            res.send({info: results.info, tasks: results.tasks})
        }
    );
}

exports.updateProject = (req, res) => {
    return notImplemented(res);
}

exports.deleteProject = (req, res) => {
    return notImplemented(res);
}

exports.getProjectTasks = (req, res, next) => {
    var projectId = req.params.projectId;
    Task.find({'project': projectId}, function (err, results){
        if (err){
            console.log(err);
            res.send("Error");
            return next(err);
        }

        res.send(results);
    });
}

