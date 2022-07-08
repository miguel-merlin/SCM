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
            grupoId,
            grupoName,
        } = req.body

        const grupos = Grupo({
            businessId,
            grupoId,
            grupoName
        })

        const gruposStored = await grupos.save()
        res.status(201).send({ gruposStored })

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

async function getGrupos(req, res) {
    const grupos = await Grupo.find().lean().exec()
    res.status(200).send({grupos})
}

async function delGrupo(req, res) {
    const grupo = await Grupo.find({businessId: req.query.firstName, grupoName: req.query.grupoName});
    if (grupo) {
        res.status(200).send({grupo})
    } else if (!grupo) {
        res.status(404).send()
    }
}

module.exports = {
    addGrupo,
    getGrupos,
}