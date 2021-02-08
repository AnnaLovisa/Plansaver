const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListItem = new Schema(
    {
        text: { type: String, required: true },
        listId: { type: String, required: true },
        userId: { type: String, required: true },
        checked: { type: Boolean, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('listitems', ListItem)