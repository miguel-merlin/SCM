const mongoose = require('mongoose');
const {appConfig} = require('../config')

const Schema = mongoose.Schema
const RecursoSchema = new Schema({
    grupoId: {
        type: String,
        trim: true,
        required: [true, 'Un recurso debe de tener un grupo']
    },
    imgUrl: {
        type: String,
        trim: true,
        required: [true, 'Un recurso debe tener un URL']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tiempoTransicion: {
        type: Number,
        default: 10,
    },
    businessId: {
        type: String,
        trim: true,
    },
    orden: {
        type: Number,
        required: [true, 'Un recurso debe de tener un orden'],
        default: 0,
    }
})

RecursoSchema.methods.setImgUrl = function setImgUrl (filename) {
    const { host, port} = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}`
} //Guardar imagenes localmente, quitar cuando acceso a google cloud

module.exports = mongoose.model('Recurso', RecursoSchema)