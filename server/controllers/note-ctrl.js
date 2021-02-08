const Note = require('../models/note-model')

createNote = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a note',
        })
    }

    const note = new Note(body)

    if (!note) {
        return res.status(400).json({ success: false, error: err })
    }

    note
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: note._id,
                message: 'Note created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Note not created!',
            })
        })
}

updateNote = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Note not found!',
            })
        }
        note.title = body.title
        note.text = body.text
        note
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: note._id,
                    message: 'Note updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Note not updated!',
                })
            })
    })
}

deleteNote = async (req, res) => {
    await Note.findOneAndDelete({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteById = async (req, res) => {
    await Note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNotesByUserId = async (req, res) => {
    await Note.find({ userId: req.params.userId }, (err, note) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNotes = async (req, res) => {

    await Note.find({}, (err, notes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: notes })
    }).catch(err => console.log(err))
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
    getNotesByUserId
}