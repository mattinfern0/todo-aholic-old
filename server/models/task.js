var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema(
    {
        name: {type: String, required: true},
        dueDate: {type: String, required: true},
        completed: {type: Boolean, required: true},
        project: {type: Schema.Types.ObjectId, ref: 'Project', required: false},  //set required to true later
        description: {type: String, required: false}
    }
);

module.exports = mongoose.model('Task', TaskSchema);