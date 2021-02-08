const express = require('express')
const ListitemCtrl = require('../controllers/listitem-ctrl')
const listItemRouter = express.Router()

listItemRouter.post('/listitem', ListitemCtrl.createListItem)
listItemRouter.put('/listitem/:id', ListitemCtrl.updateListItem)
listItemRouter.delete('/listitem/:id', ListitemCtrl.deleteListItem)
//listItemRouter.get('/listitem/:id', ListitemCtrl.getListItemById) // /api/notes/note/:id
listItemRouter.get('/', ListitemCtrl.getListItems)
listItemRouter.put('/listitem/:id/check', ListitemCtrl.checkListItem)

listItemRouter.put('/prutt/:id', ListitemCtrl.annasPruttRequest)

//todoRouter.post('/list', TodoCtrl.createList)

module.exports = listItemRouter   /* list/listitem ska denna url från api listitem stämma överens med denna i routern? */