const mongoose = require('mongoose')
const vehicleRouter = require('../controllers/vehiculos')

const vehicleSchema = new mongoose.Schema({
    marca: { type: String, required: [true, 'La marca es obligatoria'] },
    modelo: { type: String, required: [true, 'El modelo es obligatorio'] },
    año: { type: String, required: [true, 'El año es obligatorio'] },
    placa: { type: String, required: [true, 'La placa es obligatoria'] },
    tipo: { type: String, required: [true, 'El tipo es obligatorio'] },
    km: { type: String, required: [true, 'El kilometraje es obligatorio'] },
    estado: { type: String, required: [true, 'El estado es obligatorio'] },
    ubicacion: { type: String, required: [true, 'La ubicación es obligatoria'] }
})

vehicleSchema.set('toJSON',{
    transform: (document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

const vehicle = mongoose.model('vehicle',vehicleSchema)

module.exports = vehicle