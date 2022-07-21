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
        return next(new AppError('No se pudo subir el recurso', 400))
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
        return next( new AppError('No se pudo encontrar el recurso', 500))
    }
}

async function getRecursosByGroup(req, res, next) {
    const groupId = req.params.id
    try {
        const recursos = await Recurso.find({ grupoId: groupId })
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

module.exports = {
    addRecurso,
    getAllRecursos,
    getRecursoById,
    getRecursosByGroup,
    deleteRecursoById,
}