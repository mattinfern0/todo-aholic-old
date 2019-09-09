const Project = require('../models/project');
const Task = require('../models/task');
const async = require('async');
const mongoose = require('mongoose');

function notImplemented(res){
    return res.send("Not implemented");
}

function onError(err, res, next){
    //console.log("ERROR: ", err);
    //res.send("Error");
    return next(err);
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
            return onError(err, res, next);
        }

        return res.send(newProject);
    });

    console.log("Successfully added project");
}

exports.getAllProjects = (req, res, next) => {
    Project.find({}, function(err, allProjects){
        if (err){
            return onError(err, res, next);
        }

        res.send({projects: allProjects});
    });
}
//
exports.getProjectInfo = (req, res, next) => {
    var targetId = req.params.projectId
    console.log("getting project info for id: ", targetId);
    async.parallel({
            info: function(callback){
                Project.findById(targetId, callback);
            },
            tasks: function(callback){
                Task.find({project: mongoose.Types.ObjectId(targetId)}, callback);
            }
        }, function (err, results){
            if (err){
                return onError(err, res, next);
            }
            
            console.log("getProjectInfo success");
            res.send({info: results.info, tasks: results.tasks})
        }
    );
}

exports.updateProject = (req, res, next) => {
    var projectId = req.params.projectId;
    var updatedProject = req.body.project;

    console.log("Updating id: ", projectId);
    console.log("The new project: ", updatedProject);

    Project.findByIdAndUpdate(projectId, updatedProject, function(err, oldProject){
        if (err){
            return onError(err, res, next);
        }

        res.send({oldProject: oldProject});
    });
}

exports.deleteProject = (req, res, next) => {
    var projectId = req.params.projectId;
    Project.findByIdAndDelete(projectId, function(err, deleted){
        if (err){
            return onError(err, res, next);
        }

        res.send("Success");
    });
}

exports.getProjectTasks = (req, res, next) => {
    var projectId = req.params.projectId;
    
    Task.find({'project': projectId}, function (err, results){
        if (err){
            return onError(err, res, next);
        }

        res.send(results);
    });
}

