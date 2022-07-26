const express = require('express')
const { addGrupo, getAllGrupos, getGrupo, delGrupo, updateGrupo, getGruposByBusiness, checkGroupDefault } = require('../controllers/grupoController')
const api = express.Router()

api.post('/grupos', addGrupo) //Añadir un grupo
api.get('/grupos', getAllGrupos) //Get all grupos
api.get('/gruposId/:id', getGrupo) //Get grupo with id
api.delete('/grupos/:id', delGrupo) //Delete grupo with id
api.patch('/grupos/:id', updateGrupo) //Update grupo with id
api.get('/gruposBusiness/:id', getGruposByBusiness) //Get grupos pertenecientes a un negocio (id)
api.get('/checkGrupos/:id', checkGroupDefault) //Check if there are default groups given a businessId

module.exports = api