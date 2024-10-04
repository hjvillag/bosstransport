require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const vehicleRouter = require('./controllers/vehiculos')
const userRouter = require('./controllers/usuarios')
const routeRouter = require('./controllers/rutas')
const maintenanceRouter = require('./controllers/mantenimientos')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const verifyRole = require('./middleware/verifyRole')
// const morgan = require('morgan');

// Conexión a la base de datos
async function conectarBD() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Conectado a MongoDB")
    } catch (error) {
        console.log("No se ha podido conectar a MongoDB")
    }
}
conectarBD()

// Middlewares globales
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// Rutas de backend
app.use('/api/vehiculos', vehicleRouter)
app.use('/api/usuarios', userRouter)
app.use('/api/rutas', routeRouter)
app.use('/api/mantenimiento', maintenanceRouter)

// Rutas frontend rol administrador
app.use('/dashboard/admin', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'home')))
app.use('/dashboard/admin/vehiculos', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'vehiculos')))
app.use('/dashboard/admin/usuarios', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'usuarios')))
app.use('/dashboard/admin/rutas', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'rutas')))
app.use('/dashboard/admin/mantenimiento', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'mantenimiento')))
app.use('/components/admin', verifyRole('Administrador'), express.static(path.resolve('views', 'components', 'admin')))
app.use('/dashboard/admin/components', verifyRole('Administrador'), express.static(path.resolve('views', 'components', 'admin')))
app.use('/dashboard/components/admin', verifyRole('Administrador'), express.static(path.resolve('views', 'components', 'admin')))
app.use('/dashboard/admin/password', verifyRole('Administrador'), express.static(path.resolve('views', 'admin', 'password')))

// Rutas frontend rol usuario
app.use('/dashboard/users', verifyRole('Usuario'), express.static(path.resolve('views', 'users', 'home')))
app.use('/dashboard/users/vehiculos', verifyRole('Usuario'), express.static(path.resolve('views', 'users', 'vehiculos')))
app.use('/dashboard/users/rutas', verifyRole('Usuario'), express.static(path.resolve('views', 'users', 'rutas')))
app.use('/dashboard/users/mantenimiento', verifyRole('Usuario'), express.static(path.resolve('views', 'users', 'mantenimiento')))
app.use('/components/users', verifyRole('Usuario'), express.static(path.resolve('views', 'components', 'users')))
app.use('/dashboard/users/components', verifyRole('Usuario'), express.static(path.resolve('views', 'components', 'users')))
app.use('/dashboard/components/users', verifyRole('Usuario'), express.static(path.resolve('views', 'components', 'users')))
app.use('/dashboard/users/password', verifyRole('Usuario'), express.static(path.resolve('views', 'users', 'password')))

// Rutas publicas
app.use('/login', express.static(path.resolve('views', 'login')))
app.use('/verify', express.static(path.resolve('views', 'verify')))
app.use('/img', express.static(path.resolve('views', 'admin', 'img')))

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Ocurrió un error en el servidor' })
})

module.exports = app