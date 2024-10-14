const routeRouter = require('express').Router()

const route = require('../models/ruta')

//create
routeRouter.post('/', async (request, response) => {
    try {
        const nuevaRuta = new route(request.body)
        await nuevaRuta.save()
        response.status(200).json(nuevaRuta)
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
routeRouter.get('/', async (request, response)=>{
    try{
        const rutas = await route.find()
        console.log(rutas)
        return response.status(200).json(rutas)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener las rutas'})
    }
})

routeRouter.get('/:id', async (request, response) => {
    try{
        const routeId = await route.findById(request.params.id)
        response.status(200).json(routeId)
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al obtener la ruta' })
    }
})

//update
routeRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const datosActualizados = request.body

    try {
        const rutaActualizada = await route.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true })
        if (!rutaActualizada) {
            return response.status(404).json({ message: 'Ruta no encontrada' })
        }
        response.status(200).json(rutaActualizada)
    } catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al actualizar la ruta', error })
    }
})

//delete
routeRouter.delete('/:id', async (request, response) => {
    try{
        const routeId = await route.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Ruta eliminada exitosamente' })
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al eliminar la ruta' })
    }
})

module.exports = routeRouter