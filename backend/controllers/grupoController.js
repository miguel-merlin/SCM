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
        res.status(500).send({ message: error.message })
    }
}

async function getAllGrupos(req, res) {
    const grupos = await Grupo.find().lean().exec()
    res.status(200).send({ grupos })
}

async function getGrupo(req, res) {
    const id = req.params.id
    await Grupo.findById(id, function (err, grupo) {
        if (err) {
            res.status(500).send({ message: "Could not find group" })
            console.log(err)
        } else {
            res.status(200).send({message: grupo})
        }
    })
}

async function delGrupo(req, res) {
    const id = req.params.id
    await Grupo.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(500).send({ message: "Could not delete group" })
            console.log(err)
        } else {
            res.status(200).send({ message: `Grupo con id ${id} ha sido eliminado` })
        }
    })
}

module.exports = {
    addGrupo,
    getAllGrupos,
    getGrupo,
    delGrupo,
}