/*var Task = require('../testDB/task')

const tasks = [];
tasks.push(new Task("What?"), (new Date()).toISOString(), "Meh");
tasks.push(new Task("Hello there"), (new Date()).toISOString(), "Walking around");
*/
function notImplemented(res){
    return res.send("Not implemented");
}

function onError(err, res, next){
    console.log(err);
    res.send("Error");
    return next(err);
}

var Task = require('../models/task');

exports.createTask = (req, res, next) => {
    console.log("Recieved create task request");
    var reqTask = req.body.task;
    var testDate = new Date().toISOString();
    var testProjectId = "5d74c6f92a73857006c0dadd"; // id of "TestInbox"

    console.log("Adding task:", reqTask);
    var newTask = new Task(
        {
            name: reqTask.name,
            dueDate: testDate,
            completed: false,
            project: testProjectId
        }
    );

    newTask.save(function (err){
        if (err){
            console.log("Error: ", err);
            res.send("Error");
            return next(err);
        }

        return res.send(newTask);
    })
    console.log("Successfully added task");
}

exports.getAllTasks = (req, res, next) => {
    Task.find({}, function(err, allTasks){
        if (err){
            console.log("Error: ", err);
            return next(err);
        }

        res.send(allTasks);
    });
}

exports.updateTask = (req, res, next) => {
    var taskId = req.params.taskId;
    var updatedTask = req.body.task;

    Task.findByIdAndUpdate(taskId, updatedTask, function(err, oldTask){
        if (err){
            return onError(err, res, next);
        }

        res.send({oldTask: oldTask});
    });
}

exports.deleteTask = (req, res, next) => {
    var taskId = req.params.taskId;
    Task.findByIdAndDelete(taskId, function(err, deleted){
        if (err){
            return onError(err, res, next);
        }

        res.send("Success");
    });
}