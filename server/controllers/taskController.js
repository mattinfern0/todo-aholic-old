/*var Task = require('../testDB/task')

const tasks = [];
tasks.push(new Task("What?"), (new Date()).toISOString(), "Meh");
tasks.push(new Task("Hello there"), (new Date()).toISOString(), "Walking around");

function notImplemented(res){
    return res.send("Not implemented");
}*/

var Task = require('../models/task');



exports.createTask = (req, res, next) => {
    console.log("Recieved create task request");
    var reqTask = req.body.task;
    var testDate = new Date().toISOString();

    console.log("Adding task:", reqTask);
    var newTask = new Task(
        {
            name: reqTask.name,
            dueDate: testDate,
            completed: false,
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
    console.log("Successfully added");
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

exports.updateTask = (req, res) => {
    return notImplemented(res);
}

exports.deleteTask = (req, res) => {
    return notImplemented(res);
}