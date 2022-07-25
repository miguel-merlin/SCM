const mongoose = require('mongoose')
const {appConfig} = require('../config')

const Schema = mongoose.Schema
const GrupoSchema = new Schema({
    businessId: {
        type: String,
        trim: true,
        required: [true, 'Un grupo debe de tener un business ID']
    },
    grupoName: {
        type: String,
        required: [true, 'Un grupo debe de tener un nombre']
    },
    isDefault: {
        type: Boolean,
        required: [true, 'Un grupo de tener configuracion (Default)']
    },
    autoplay: {
        type: Boolean,
        required: [true, 'Un grupo debe tener configuracion (Autoplay)']
    }
})

module.exports = mongoose.model('Grupo', GrupoSchema)