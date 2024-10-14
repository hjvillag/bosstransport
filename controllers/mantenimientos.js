const maintenanceRouter = require('express').Router()

const maintenance = require('../models/mantenimiento')

//create
maintenanceRouter.post('/', async (request, response) => {
    try {
        const nuevoMantenimiento = new maintenance(request.body)
        await nuevoMantenimiento.save()
        response.status(200).json(nuevoMantenimiento)
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            response.status(400).json({ message: 'Error de validación', errors: error.errors })
        } else {
            response.status(400).json({ message: 'Error al registrar la ruta' })
        }
    }
})

//read
maintenanceRouter.get('/', async (request, response)=>{
    try{
        const mantenimiento = await maintenance.find()
        console.log(mantenimiento)
        return response.status(200).json(mantenimiento)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener mantenimientos'})
    }
})

maintenanceRouter.get('/:id', async (request, response) => {
    try{
        const maintenanceId = await maintenance.findById(request.params.id)
        response.status(200).json(maintenanceId)
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al obtener mantenimiento' })
    }
})

//update
maintenanceRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const datosActualizados = request.body

    try {
        const mantenimientoActualizado = await maintenance.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true })
        if (!mantenimientoActualizado) {
            return response.status(404).json({ message: 'Mantenimiento no encontrado' })
        }
        response.status(200).json(mantenimientoActualizado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al actualizar mantenimiento', error })
    }
})

//delete
maintenanceRouter.delete('/:id', async (request, response) => {
    try{
        const maintenanceId = await maintenance.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Mantenimiento eliminado exitosamente' })
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al eliminar mantenimiento' })
    }
})

module.exports = maintenanceRouter