const AppError = require('../utils/appError')
const Grupo = require('../models/Grupo')

async function addGrupo(req, res, next) {
    try {
        let grupo = await Grupo.findOne({$and: [{grupoName: req.body.grupoName}, {businessId: req.body.businessId}]});
        
        if (grupo) {
            return next(new AppError('Ya existe un grupo con ese nombre', 400));
        }

        if (req.body.isDefault) {
            try {
                await Grupo.updateMany({businessId: req.body.businessId}, {$set: {isDefault: false}});
            } catch (error) {
                return next(new AppError(`No se pudieron actualizar los grupos ${error}`))
            }
        }

        const {
            businessId,
            grupoName,
            isDefault,
            autoplay,
        } = req.body

        const grupos = Grupo({
            businessId,
            grupoName,
            isDefault,
            autoplay,
        })

        const gruposStored = await grupos.save()
        res.status(201).send({ gruposStored })

    } catch (error) {
        next(new AppError(`No se pudo guardar el grupo ${error}`, 500))
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
        res.status(200).send({ grupo })
    } catch (error) {
        return next(new AppError(`No se encontro el grupo ${error}`, 500))
    }
}

async function getGruposByBusiness(req, res, next) {
    const businessId = req.params.id
    try {
        const grupos = await Grupo.find({ businessId: businessId })
        res.status(200).send({ grupos })
    } catch (error) {
        return next(new AppError(`No se pudieron encontrar los grupos ${error}`, 404))
    }
}

async function delGrupo(req, res, next) {
    const id = req.params.id
    try {
        const delGrupo = await Grupo.findByIdAndDelete(id)
        res.status(200).send({ delGrupo })
    } catch (error) {
        return next(new AppError(`No se pudo borrar el grupo ${error}`), 500)
    }
}

async function updateGrupo(req, res, next) {
    const id = req.params.id
    try {
        await Grupo.findByIdAndUpdate(id, {$set: req.body});
        const updtGrupo = await Grupo.findById(id)
        res.status(200).send(updtGrupo)
    } catch (error) {
        return next(new AppError(`No se pudo modificar el grupo ${error}`), 500)
    }
}

module.exports = {
    addGrupo,
    getAllGrupos,
    getGrupo,
    delGrupo,
    updateGrupo,
    getGruposByBusiness,
}