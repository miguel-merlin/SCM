const mongoose = require('mongoose')
const {appConfig} = require('../config')

const Schema = mongoose.Schema
const GrupoSchema = new Schema({
    businessId: {
        type: String,
        trim: true,
        required: [true, 'Un grupo debe de tener un business ID']
    },
    grupoId: {
        type: String,
        trim: true,
        required: [true, 'Un grupo debe de tener un business ID']   
    },
    grupoName: {
        type: String,
        required: [true, 'Un grupo debe de tener un nombre']
    }
})

module.exports = mongoose.model('Grupo', GrupoSchema)