const AppError = require('../utils/appError')
const Grupo = require('../models/Grupo')

async function addGrupo(req, res, next) {
    try {
        let grupo = await Grupo.findOne({
            grupoName: req.body.grupoName,
        });

        if (grupo) {
            return next(new AppError('Ya existe un grupo con ese nombre', 400));
        }

        const {
            businessId,
            grupoName,
            isDefault,
        } = req.body

        const grupos = Grupo({
            businessId,
            grupoName,
            isDefault,
        })

        const gruposStored = await grupos.save()
        res.status(201).send({ gruposStored })

    } catch (error) {
        next( new AppError('No se pudo guardar el grupo', 500))
    }
}

async function getAllGrupos(req, res) {
    const grupos = await Grupo.find().lean().exec()
    res.status(200).send({ grupos })
}

async function getGrupo(req, res, next) {
    const id = req.params.id
    try {
        const grupo = await Grupo.findById(id)
        res.status(200).send({grupo})
    } catch (error) {
        return next( new AppError('No se encontro el grupo', 500))
    }
}

async function delGrupo(req, res, next) {
    const id = req.params.id
    try {
        const delGrupo = await Grupo.findByIdAndDelete(id)
        res.status(200).send({delGrupo})
    } catch (error) {
        return next( new AppError('No se pudo borrar el grupo'), 500)
    }
}

async function updateGrupo(req, res, next) {
    const id = req.params.id
    try {
        await Grupo.findByIdAndUpdate(id, req.body);
        await Grupo.save();
        const updtGrupo = await Grupo.findById(id)
        res.status(200).send(updtGrupo)
    } catch (error) {
        return next( new AppError('No se pudo modificar el grupo'), 500)
    }
}

module.exports = {
    addGrupo,
    getAllGrupos,
    getGrupo,
    delGrupo,
    updateGrupo,
}