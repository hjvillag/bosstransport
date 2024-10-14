const mongoose = require('mongoose')
const maintenanceRouter = require('../controllers/mantenimientos')

const maintenanceSchema = new mongoose.Schema({
    marca:{ type: String, required: [true, 'La marca es obligatoria'] },
    modelo:{ type: String, required: [true, 'El modelo es obligatorio'] },
    año:{ type: String, required: [true, 'El año es obligatorio'] },
    placa:{ type: String, required: [true, 'La placa es obligatoria'] },
    fechaProgramada:{ type: String, required: [true, 'La fecha programada es obligatoria'] },
    mantenimiento:{ type: String, required: [true, 'El tipo de mantenimiento es obligatorio'] },
    detalles:{ type: String, required: [true, 'Los detalles iniciales son obligatorios'] },
    fechaCierre:{ type: String, required: [true, 'La fecha de cierre es obligatoria'] },
    resultado:{ type: String, required: [true, 'El resultado es obligatorio'] },
    detallesCierre:{ type: String, required: [true, 'Los detalles finales son obligatorios'] },
    usuario:{ type: String, required: [true, 'El usuario es obligatorio'] },
    idVehiculo:{ type: String, required: [true, 'El ID del vehiculo es obligatorio'] }
})

maintenanceSchema.set('toJSON',{
    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

const maintenance = mongoose.model('maintenance',maintenanceSchema)

module.exports = maintenance