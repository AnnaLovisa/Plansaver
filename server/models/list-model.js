const mongoose = require('mongoose')
const Schema = mongoose.Schema

const List = new Schema(
    {
        title: { type: String, required: true },
        userId: { type: String, required: true },
        projectId: { type: String, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('lists', List)
