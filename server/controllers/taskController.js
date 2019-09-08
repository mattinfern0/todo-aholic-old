const testTasks = []

function notImplemented(res){
    return res.send("Not implemented");
}

exports.createTask = (req, res) => {
    console.log("Recieved create task request");
    var newTask = req.body.task;
    console.log("Adding task:", newTask);
    testTasks.push(newTask);
    console.log("After adding: ", testTasks);

    return res.send(newTask);
}

exports.updateTask = (req, res) => {
    return notImplemented(res);
}

exports.deleteTask = (req, res) => {
    return notImplemented(res);
}