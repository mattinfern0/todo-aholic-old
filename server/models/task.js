const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// To allow empty strings in description field
mongoose.Schema.Types.String.checkRequired((v) => v != null);

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    dueDate: { type: String, required: true },
    completed: { type: Boolean, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    description: { type: String, required: true },
  },
);

module.exports = mongoose.model('Task', TaskSchema);
