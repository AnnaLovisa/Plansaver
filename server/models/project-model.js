const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        projectName: { type: String, required: true },
        userId: { type: String, required: true },
        listIds: { type: Array, required: false },
        noteIds: { type: Array, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('projects', Project)