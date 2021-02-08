const express = require('express')
const ListCtrl = require('../controllers/list-ctrl')
const ListItemCtrl = require('../controllers/listitem-ctrl');
const listRouter = express.Router()

listRouter.post('/list', ListCtrl.createList)
listRouter.put('/list/:id', ListCtrl.updateListById)
listRouter.delete('/list/:id', ListCtrl.deleteListById)
listRouter.get('/list/:id', ListCtrl.getListsByUserId)

listRouter.get('/list/:id/listitems', ListItemCtrl.getListItemsByListId)


module.exports = listRouter