const vehicleRouter = require('express').Router()

const vehicle = require('../models/vehiculo')

//create
vehicleRouter.post('/', async (request, response) => {
    try {
        const nuevoVehiculo = new vehicle(request.body)
        await nuevoVehiculo.save()
        response.status(200).json(nuevoVehiculo)
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            response.status(400).json({ message: 'Error de validación', errors: error.errors })
        } else {
            response.status(400).json({ message: 'Error al registrar el vehiculo' })
        }
    }
})

//read
vehicleRouter.get('/', async (request, response)=>{
    try{
        const vehiculos = await vehicle.find()
        console.log(vehiculos)
        return response.status(200).json(vehiculos)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los vehiculos'})
    }
})

vehicleRouter.get('/:id', async (request, response) => {
    try{
        const vehicleId = await vehicle.findById(request.params.id)
        response.status(200).json(vehicleId)
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al obtener el producto' })
    }
})

//update
vehicleRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const datosActualizados = request.body

    try {
        const vehiculoActualizado = await vehicle.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true })
        if (!vehiculoActualizado) {
            return response.status(404).json({ message: 'Vehículo no encontrado' })
        }
        response.status(200).json(vehiculoActualizado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al actualizar el vehículo', error })
    }
})

//delete
vehicleRouter.delete('/:id', async (request, response) => {
    try{
        const vehicleId = await vehicle.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Vehiculo eliminado exitosamente' })
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al eliminar el vehiculo' })
    }
})



module.exports = vehicleRouter