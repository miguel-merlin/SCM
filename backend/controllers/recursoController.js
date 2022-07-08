const Recurso = require('../models/Recurso')

async function addRecurso(req, res) {
    try {
        const  {
            groupoId,
            imgUrl,
            isDefault,
        } = req.body

        const recursos = Recurso({
            groupoId,
            imgUrl,
            isDefault,
        })

        if(req.file) {
            const {filename} = req.file
            recursos.setImgUrl(filename)
        }

        const recursosStored = await recursos.save()

        res.status(201).send({ recursosStored })
    } catch (e) {
        res.status(500).send({message : e.message})
    }
}



async function getRecursos(req, res) {
    const recursos = await Recurso.find().lean().exec()
    res.status(200).send({recursos})
}

module.exports = {
    addRecurso,
    getRecursos
}