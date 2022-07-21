const Recurso = require('../models/Recurso')

async function addRecurso(req, res) {
    try {
        const {
            groupoId,
            imgUrl,
            tiempoTransicion,
            businessId,
            orden
        } = req.body

        const recursos = Recurso({
            groupoId,
            imgUrl,
            tiempoTransicion,
            businessId,
            orden,
        })

        if (req.file) {
            const { filename } = req.file
            recursos.setImgUrl(filename)
        }

        const recursosStored = await recursos.save()

        res.status(201).send({ recursosStored })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}



async function getAllRecursos(req, res) {
    const recursos = await Recurso.find().lean().exec()
    res.status(200).send({ recursos })
}

async function getRecursoById(req, res) {
    const id = req.params.id
    await Recurso.findById(id, function (err, recurso) {
        if (err) {
            res.status(500).send({ message: `No se encontro el recurso con id ${id}` })
            console.log(err)
        } else {
            res.status(200).send({ message: recurso })
        }
    })
}

async function getRecursosByGroup(req, res) {
    const groupId = req.params.id
    await Recurso.find({ grupoId: groupId }, function (err, recursos) {
        if (err) {
            res.status(500).send({ message: `No se encontraron los recursos para el grupo con id ${groupId}` })
            console.log(err)
        } else {
            res.status(200).send({ message: recursos })
        }
    })
}

async function deleteRecursoById(req, res) {
    const id = req.params.id
    await Recurso.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(500).send({ message: `El recurso con id ${id} no ha podido ser eliminado` })
            console.log(err)
        } else {
            res.status(200).send({ message: `El recurso con id ${id} ha sido eliminado` })
        }
    })
}

module.exports = {
    addRecurso,
    getAllRecursos,
    getRecursoById,
    getRecursosByGroup,
    deleteRecursoById,
}