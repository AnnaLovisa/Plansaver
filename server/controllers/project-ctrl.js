const Project = require('../models/project-model')
//const ProjectList = require('../models/project-list-model');

createProject = (req, res) => {
    const body = req.body
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }

    const project = new Project(body)
    
    if(!project) {
        return res.status(400).json({ success: false, error: err })
    }

    project
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: project._id,
                message: 'Project created',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Project not created!'
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

getProjectsByUserId = async (req, res) => {
    await Project.find({ userId: req.params.userId }, (err, projects) => {
        if(err) {
            return res.status(400).json({ success: false, error: err})
        }

        if(!projects) {
            return res
                .status(404)
                .json({ success: false, error: `Projects not found` })
        }
        return res.status(200).json({ success: true, data: projects})
    }).catch(err => console.log(err))
}

createProjectList = async (req, res) => {
    const body = req.body
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must select a list and project'
        })
    }

    const projectList = new ProjectList

    if (!list) {
        return res.status(400).json({ success: false, error: err })
    }

    projectList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: projectList._id,
                message: 'ProjectList created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'ProjectList not created!',
            })
        })
}

module.exports = {
    createProject,
    getProjectsByUserId,
    createProjectList
}