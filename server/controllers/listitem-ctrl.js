const ListItem = require('../models/listitem-model')

createListItem = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a listitem',
        })
    }

    const listitem = new ListItem(body)
    

    if (!listitem) {
        return res.status(400).json({ success: false, error: err })
    }

    listitem
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: listitem._id,
                message: 'Listitem created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Listitem not created!',
            })
        })
}

annasPruttRequest = async (req, res) => {
    let something = await ListItem.findOneAndUpdate({
        _id: req.params.id,
    }, {
        checked: true
    })

    return res.status(200).json({
        something: something,
        vadgoeranna: req.body.anna
    })
}

updateListItem = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    let something = await ListItem.findOneAndUpdate({
        _id: req.params.id
        }, {
            checked: req.body.checked == 'true'
        }, {
            new: true
        })
        
    return res.status(200).json({
        something: something
    })
}

deleteListItem = async (req, res) => {
    await ListItem.findOneAndDelete({ _id: req.params.id }, (err, listitem) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!listitem) {
            return res
                .status(404)
                .json({ success: false, error: `Listitem not found` })
        }
        console.log("deleted?")
        return res.status(200).json({ success: true, data: listitem })
    }).catch(err => console.log(err))
}

checkListItem = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    ListItem.findOne({ 
        _id: req.params.id
       
    }, (err, listitem) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Listitem not found!',
            })
        }
        listitem.checked = body.checked
        listitem
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: listitem._id
                    //message: 'Todo updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error
                    //message: 'Todo not updated!',
                })
            })
    })
}

getListItemsByListId = async (req, res) => {
    await ListItem.find({ listId: req.params.id }, (err, listitem) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!listitem) {
            return res
                .status(404)
                .json({ success: false, error: `Listitem not found` })
        }
        return res.status(200).json({ success: true, data: listitem })
    }).catch(err => console.log(err))
}

getListItemsByUserId = async (req, res) => {
    await ListItem.find({ userId: req.params.userId }, (err, listitem) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!listitem) {
            return res
                .status(404)
                .json({ success: false, error: `Listitem not found` })
        }
        return res.status(200).json({ success: true, data: listitem })
    }).catch(err => console.log(err))
}

getListItems = async (req, res) => {

    await ListItem.find({}, (err, listitems) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!listitems.length) {
            return res
                .status(404)
                .json({ success: false, error: `Listitems not found` })
        }
        return res.status(200).json({ success: true, data: listitems })
    }).catch(err => console.log(err))
}

//Get listitems by listId
//När man trycker på en lista ska man skicka ett request från frontend som hämtar listan och alla todos som har det listId:t
//Hämta alla listor, noteTitlar och projekt direkt på startsidan

module.exports = {
    annasPruttRequest,
    createListItem,
    updateListItem,
    deleteListItem,
    getListItems,
    getListItemsByListId,
    getListItemsByUserId,
    checkListItem
}