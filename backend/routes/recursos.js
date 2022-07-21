const express = require('express')
const upload = require('../libs/storage')
const {addRecurso, getAllRecursos, getRecursoById, deleteRecursoById, getRecursosByGroup, updateRecursoId} = require('../controllers/recursoController')
const api = express.Router()

api.post('/recursos', upload.single('image'), addRecurso) //Añadir recursos
api.get('/recursos', getAllRecursos) //Obtener todos los recursos en Base de datos
api.get('/recursoId/:id', getRecursoById) //Obtener recursos por id
api.delete('/recurso/:id', deleteRecursoById) //Eliminar recurso por id
api.get('/recursosGroup/:id', getRecursosByGroup) //Obtener recursos por grupo
api.patch('/recurso', updateRecursoId) //Update recurso con ID

module.exports = api