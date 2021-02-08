const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectList = new Schema(
    {
        projectId: { type: Number, required: true },
        listId: { type: Number, required: true }     
    },
    { timestamps: true },
)

module.exports = mongoose.model('project-lists', ProjectList)