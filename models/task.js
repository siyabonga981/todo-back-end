const mongoose = require('mongoose');

var Task = mongoose.model('Task', {
    taskName: String,
    taskDescription: String,
    dateCreated: String,
    dateCompleted: String,
    markedComplete: Boolean
});

module.exports = { Task };