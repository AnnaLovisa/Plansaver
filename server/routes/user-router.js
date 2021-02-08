const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const ListItemCtrl = require('../controllers/listitem-ctrl');
const NoteCtrl = require('../controllers/note-ctrl');
const ProjectCtrl = require('../controllers/project-ctrl');
const ListCtrl = require('../controllers/list-ctrl');
const userRouter = express.Router();

userRouter.post('/register', UserCtrl.createUser);
userRouter.post('/login', UserCtrl.loginUser);

//userRouter.get('/user/:userId/listitems', ListItemCtrl.getListItemsByUserId)
//userRouter.put('/user/:userId/listitems/:id', ListItemCtrl.updateListItem)
//userRouter.delete('/user/:userId/listitems/:id', ListItemCtrl.deleteListItem)

userRouter.get('/user/:userId/notes', NoteCtrl.getNotesByUserId)
userRouter.put('/user/:userId/notes/:id', NoteCtrl.updateNote)
userRouter.delete('/user/:userId/notes/:id', NoteCtrl.deleteNote)

userRouter.get('/user/:userId/projects', ProjectCtrl.getProjectsByUserId)

userRouter.get('/user/:userId/lists', ListCtrl.getListsByUserId)

module.exports = userRouter

//export const getListsByUserId = userId => api.get(`/users/user/${userId}/lists`)
//app.use('/api/users', userRouter)