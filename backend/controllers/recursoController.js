const Recurso = require('../models/Recurso')
const sharp = require('sharp');
const AppError = require('../utils/appError');

async function addRecurso(req, res, next) {
    try {
        const {
            grupoId,
            imgUrl,
            tiempoTransicion,
            businessId,
            orden
        } = req.body

        const recursos = Recurso({
            grupoId,
            imgUrl,
            tiempoTransicion,
            businessId,
            orden,
        })

        if (!req.file) {
            next();
        }
        req.file.filename = `${req.file.fieldname}-${Date.now()}.jpeg`
        const filename = req.file.filename

        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`./storage/imgs/${req.file.filename}`);

        recursos.setImgUrl(filename)
        const recursosStored = await recursos.save()
        res.status(201).send({ recursosStored })
    } catch (e) {
        return next(new AppError(`No se pudo subir el recuros ${e}`, 400))
    }
}

async function getAllRecursos(req, res) {
    const recursos = await Recurso.find().lean().exec()
    res.status(200).send({ recursos })
}

async function getRecursoById(req, res, next) {
    const id = req.params.id
    try {
       const recurso = await Recurso.findById(id)
       res.status(200).send({recurso})
    } catch (error) {
        return next( new AppError(`No se pudo encontrar el recurso ${error}`, 500))
    }
}

async function getRecursosByGroup(req, res, next) {
    const grupoId = req.params.grupoId
    const businessId = req.params.businessId
    try {
        const recursos = await Recurso.find({ $and: [{businessId: businessId},{grupoId:grupoId}] })
        res.status(200).send({recursos})
    } catch (error) {
        return next( new AppError('No se pudieron encontrar los recursos', 500))
    }
}

async function deleteRecursoById(req, res, next) {
    const id = req.params.id
    try {
        const delRecurso = await Recurso.findByIdAndDelete(id)
        res.status(200).send({delRecurso})
    } catch (error) {
        return next( new AppError('No se encontro el grupo', 500))
    }
}

async function updateRecursoId(req, res, next){
    const id = req.params.id
    try {
        await Recurso.findByIdAndUpdate(id, {$set: req.body})
        const updtRecurso = await Recurso.findById(id);
        res.status(200).send({updtRecurso})
    } catch (error) {
        return next( new AppError('No se pudo actualizar el grupo', 500))
    }
}

async function getRecursosByOrden(req, res, next) {
    const grupoId = req.params.grupoId
    const businessId = req.params.businessId
    let arregloRecursos;
    try {
        const recursos = await Recurso.find({$and: [{businessId: businessId}, {grupoId: grupoId}]})
        arregloRecursos = recursos
        arregloRecursos.sort(function(a,b) {
            return parseFloat(a.orden) - parseFloat(b.orden)
        });
        res.status(201).send(arregloRecursos)
    } catch (error) {
        return next(new AppError(`No se pudieron encontrar las URLS ${error}`, 400))
    }
}

module.exports = {
    addRecurso,
    getAllRecursos,
    getRecursoById,
    getRecursosByGroup,
    deleteRecursoById,
    updateRecursoId,
    getRecursosByOrden,
}