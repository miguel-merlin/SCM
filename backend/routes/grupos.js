const express = require('express')
const { addGrupo, getAllGrupos, getGrupo, delGrupo, updateGrupo, getGruposByBusiness } = require('../controllers/grupoController')
const api = express.Router()

api.post('/grupos', addGrupo) //Añadir un grupo
api.get('/grupos', getAllGrupos) //Get all grupos
api.get('/gruposId/:id', getGrupo) //Get grupo with id
api.delete('/grupos/:id', delGrupo) //Delete grupo with id
api.patch('/grupos/:id', updateGrupo) //Update grupo with id
api.get('/gruposBusiness/:id', getGruposByBusiness) //Get grupos pertenecientes a un negocio (id)

module.exports = api