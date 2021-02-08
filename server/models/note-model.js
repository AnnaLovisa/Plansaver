const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema(
    {
        title: { type: String, required: false },
        text: { type: String, required: true },
        userId: { type: String, required: false },
        projectId: { type: Number, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('notes', Note)