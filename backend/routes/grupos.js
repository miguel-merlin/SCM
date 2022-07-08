const express = require('express')
const { addGrupo, getGrupos } = require('../controllers/grupoController')
const api = express.Router()

api.post('/grupos', addGrupo)
api.get('/grupos', getGrupos)

module.exports = api