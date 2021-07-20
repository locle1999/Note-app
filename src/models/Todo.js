const { Schema, model } = require('mongoose');
const TodoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('Todo', TodoSchema);