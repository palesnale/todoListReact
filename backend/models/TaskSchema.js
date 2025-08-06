const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    dueDate: {type: Date, required: true},
    category: {type: String},
    description: {type: String},
    status: {type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending'}
});

module.exports = mongoose.model('Task', TaskSchema);