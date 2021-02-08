const express = require('express')
const NoteCtrl = require('../controllers/note-ctrl')
const noteRouter = express.Router()

noteRouter.post('/note', NoteCtrl.createNote)
noteRouter.put('/note/:id', NoteCtrl.updateNote)
noteRouter.delete('/note/:id', NoteCtrl.deleteNote)
noteRouter.get('/note/:id', NoteCtrl.getNoteById) // /api/notes/note/:id
//noteRouter.get('/notes', NoteCtrl.getNotes) // /api/notes/notes
noteRouter.get('/', NoteCtrl.getNotes) // /api/notes


module.exports = noteRouter