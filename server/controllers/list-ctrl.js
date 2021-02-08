const List = require('../models/list-model')

createList = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a list',
        })
    }

    const list = new List(body)

    if (!list) {
        return res.status(400).json({ success: false, error: err })
    }

    list
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: list._id,
                message: 'List created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'List not created!',
            })
        })
}

updateListById = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    console.log("fsdf", req.params)

    let list = await List.findByIdAndUpdate({
        _id: req.params.id
        }, { 
            projectId: req.body.projectId
        }, {
            new: true
        })

    return res.status(200).json({
        list: list,
        //vadgoeranna: req.body.anna
        //projectId: projectId
    })
}

deleteListById = async (req, res) => {
    await List.findOneAndDelete({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }

        return res.status(200).json({ success: true, data: list })
    }).catch(err => console.log(err))
}

getListsByUserId = async (req, res) => {
    await List.find({ userId: req.params.userId }, (err, list) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!list) {
            return res
                .status(404)
                .json({ success: false, error: `List not found` })
        }
        return res.status(200).json({ success: true, data: list })
    }).catch(err => console.log(err))
}

getListsByProjectId = async (req, res) => {
    console.log("projectID", req.params.projectId)
    await List.find({ projectId: req.params.projectId }, (err, lists) => {
        console.log("lists", lists)
        if(err) {
            return res.status(400).json( { success: false, error: err })
        }

        if(!lists) {
            return res
                .status(404)
                .json({ success: false, error: `Lists not found` })
        }
        return res.status(200).json({ success: true, data: lists })
    }).catch(err => console.log(err))
}


module.exports = {
    createList,
    updateListById,
    deleteListById,
    getListsByUserId,
    getListsByProjectId  
}