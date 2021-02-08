const express = require('express')
const ProjectCtrl = require('../controllers/project-ctrl')
const ListCtrl = require('../controllers/list-ctrl')
const projectRouter = express.Router()

projectRouter.post('/project', ProjectCtrl.createProject)

projectRouter.get('/project/:projectId/lists', ListCtrl.getListsByProjectId)
//projectRouter.post('/project/:id/list/:id', ProjectCtrl.createProjectList)

module.exports = projectRouter