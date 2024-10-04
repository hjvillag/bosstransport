const mongoose = require('mongoose')
const routeRouter = require('../controllers/rutas')

const routeSchema = new mongoose.Schema({
    fecha: { type: String, required: [true, 'La fecha es obligatoria'] },
    origen: { type: String, required: [true, 'El origen es obligatorio'] },
    destino: { type: String, required: [true, 'El destino es obligatorio'] },
    distancia: { type: String, required: [true, 'La distancia es obligatoria'] },
    tiempo: { type: String, required: [true, 'El tiempo es obligatorio'] },
    kmInicial: { type: String, required: [true, 'Los KM iniciales son obligatorios'] },
    vehiculo: { type: String, required: [true, 'El vehiculo es obligatorio'] },
    usuario: { type: String, required: [true, 'El usuario es obligatorio'] },
    estadoRuta: { type: String, required: [true, 'El estado de la ruta es obligatorio'] },
    detalles: { type: String, required: [true, 'Los detalles iniciales son obligatorios'] },
    idVehiculo: { type: String, required: [true, 'El ID del vehiculo es obligatorio'] },
    fechaFinal: { type: String, required: [true, 'La fecha final es obligatoria'] },
    estadoFinal: { type: String, required: [true, 'El estado final del vehiculo es obligatorio'] },
    kmFinal: { type: String, required: [true, 'Los KM finales son obligatorios'] },
    detallesFinal: { type: String, required: [true, 'Los detalles finales son obligatorios'] },
    usuarioEdit: { type: String, required: [true, 'El usuario editor es obligatorio'] },
})

routeSchema.set('toJSON',{
    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

const route = mongoose.model('route',routeSchema)

module.exports = route