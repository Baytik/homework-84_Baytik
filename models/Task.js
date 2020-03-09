const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        required: true,
        enum: ['new', 'in_progress', 'complete']
    }
});

const Album = mongoose.model('Task', TaskSchema);

module.exports = Album;
