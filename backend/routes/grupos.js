const express = require('express')
const { addGrupo, getGrupos, delGrupo } = require('../controllers/grupoController')
const api = express.Router()

api.post('/grupos', addGrupo)
api.get('/grupos', getGrupos)
api.delete('/grupos', delGrupo)

module.exports = api