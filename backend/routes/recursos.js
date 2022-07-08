const express = require('express')
const upload = require('../libs/storage')
const {addRecurso, getRecursos} = require('../controllers/recursoController')
const api = express.Router()

api.post('/recursos', upload.single('image'), addRecurso)
api.get('/recursos', getRecursos)

module.exports = api