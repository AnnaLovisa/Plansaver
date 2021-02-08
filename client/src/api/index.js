import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
})

export const insertListItem = payload => api.post(`/listitems/listitem`, payload)
export const getListItemsByListId = (listId) => api.get(`/lists/list/${listId}/listitems`)
export const updateListItemById = (id, payload) => api.put(`/listitems/listitem/${id}`, payload)
export const deleteListItemById = id => api.delete(`/listitems/listitem/${id}`)
export const checkListItemById = (id, payload) => api.put(`/listitem/${id}/check`, payload)
export const getListItemById = id => api.get(`/listitem/${id}`)
export const getListItemsByUserId = userId => api.get(`/users/user/${userId}/listitems`)
export const getListsByProjectId = projectId => api.get(`/projects/project/${projectId}/lists`)

export const insertNote = payload => api.post(`/notes/note`, payload)
export const getAllNotes = () => api.get(`/notes`)
export const updateNoteById = (id, payload) => api.put(`/notes/note/${id}`, payload)
export const deleteNoteById = id => api.delete(`/notes/note/${id}`)
export const getNoteById = id => api.get(`/notes/note/${id}`)
export const getNotesByUserId = userId => api.get(`/users/user/${userId}/notes`)

export const createProject = payload => api.post(`/projects/project`, payload)
export const getProjectsByUserId = userId => api.get(`/users/user/${userId}/projects`)
export const updateProjectById = (id, payload) => api.put(`/projects/project/${id}`, payload)
export const deleteProjectById = id => api.delete(`/projects/project/${id}`)
//export const createProjectList = (listId, projectId, payload) => api.post(`/project/${projectId}/list/${listId}`, payload)

export const createList = payload => api.post(`/lists/list`, payload)
export const getListsByUserId = userId => api.get(`/users/user/${userId}/lists`)
export const updateListById = (id, payload) => api.put(`/lists/list/${id}`, payload)
export const deleteListById = id => api.delete(`/lists/list/${id}`)


const apis = {
    insertListItem,
    getListItemsByListId,
    updateListItemById,
    deleteListItemById,
    checkListItemById,
    getListItemById,
    getListItemsByUserId,
    insertNote,
    getAllNotes,
    updateNoteById,
    deleteNoteById,
    getNoteById,
    getNotesByUserId,
    createProject,
    getProjectsByUserId,
    updateProjectById,
    deleteProjectById,
    createList,
    getListsByUserId,
    updateListById,
    deleteListById,
    getListsByProjectId
}

export default apis