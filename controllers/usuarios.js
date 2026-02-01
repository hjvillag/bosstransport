const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const user = require('../models/usuario')

//Generar una contraseña aleatoria
function generarContraseñaAleatoria() {
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiales = '!@#$%&*()';
    const todosCaracteres = mayusculas + minusculas + numeros + especiales;

    let contraseña = '';
    contraseña += mayusculas.charAt(Math.floor(Math.random() * mayusculas.length));
    contraseña += numeros.charAt(Math.floor(Math.random() * numeros.length));
    contraseña += especiales.charAt(Math.floor(Math.random() * especiales.length));

    for (let i = 3; i < 12; i++) {
        contraseña += todosCaracteres.charAt(Math.floor(Math.random() * todosCaracteres.length));
    }

    contraseña = contraseña.split('').sort(() => 0.5 - Math.random()).join('');

    return contraseña;
}

//create
userRouter.post('/', async (request, response) => {
    const { pnombre, snombre, papellido, sapellido, cedula, fnacimiento, telefono, email, tipo } = request.body
    const password = generarContraseñaAleatoria()
    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const nuevoUsuario = new user({ pnombre, snombre, papellido, sapellido, cedula, fnacimiento, telefono, email, password: hashedPassword, tipo, verificationToken, verificacion: false })
    try {
        await nuevoUsuario.save()

        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // Configurar el correo electrónico
        const verificationLink = `https://bosstransport.onrender.com/verify?token=${verificationToken}`
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Credenciales de acceso',
            text: `¡Bienvenid@ ${pnombre} ${papellido}!\n\nTu cuenta ha sido creada exitosamente. A continuación, tus credenciales de acceso:\n\nEmail: ${email}\nPassword: ${password}\n\nCambia tu contraseña por una facil de recordar\n\nPor favor, verifica tu cuenta haciendo clic en el siguiente enlace:\n\n${verificationLink}\n\n`
        }

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        response.status(200).json(nuevoUsuario)
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            response.status(400).json({ message: 'Error de validación', errors: error.errors })
        } else {
            response.status(400).json({ message: 'Error al registrar al usuario' })
        }
    }
})

//read
userRouter.get('/', async (request, response)=>{
    try{
        const usuarios = await user.find()
        return response.status(200).json(usuarios)
    }catch(error){
        console.error(error)
        return response.status(400).json({error: 'Error al obtener los usuarios'})
    }
})

userRouter.get('/:id', async (request, response) => {
    try{
        const userId = await user.findById(request.params.id)
        response.status(200).json(userId)
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al obtener el usuario' })
    }
})

//update
userRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const datosActualizados = request.body

    try {
        const usuarioActualizado = await user.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true })
        if (!usuarioActualizado) {
            return response.status(404).json({ message: 'Usuario no encontrado' })
        }
        response.status(200).json(usuarioActualizado)
    } catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al actualizar el usuario', error })
    }
})

//delete
userRouter.delete('/:id', async (request, response) => {
    try{
        const userId = await user.findByIdAndDelete(request.params.id);
        response.status(200).json({ message: 'Usuario eliminado exitosamente' })
    }catch (error) {
        console.error(error)
        response.status(400).json({ message: 'Error al eliminar el usuario' })
    }
})

//login
userRouter.post('/login', async (request, response) => {
    const { email, password } = request.body

    if (!email || !password) {
        return response.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    try {
        const userSession = await user.findOne({ email })
        if (!userSession) {
            return response.status(400).json({ message: 'Usuario invalido' })
        }

        if (!userSession.verificacion) {
            return response.status(400).json({ message: 'Cuenta no verificada. Por favor, verifica tu cuenta a través del enlace enviado a tu correo electrónico.' })
        }

        if (userSession.tipo === 'Inactivo') {
            return response.status(403).json({ message: 'Su cuenta está inactiva. Por favor, comuníquese con el administrador del sistema.' })
        }

        const passwordMatch = await bcrypt.compare(password, userSession.password)
        if (!passwordMatch) {
            return response.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const userData = {
            id: userSession.id,
            pnombre: userSession.pnombre,
            snombre: userSession.snombre,
            papellido: userSession.papellido,
            sapellido: userSession.sapellido,
            email: userSession.email,
            tipo: userSession.tipo
        }
        console.log('userData:', JSON.stringify(userData))

        response.cookie('userSession', JSON.stringify(userData), { httpOnly: false, secure: false });

        return response.status(200).json({ message: 'Autenticación exitosa', user: userData, tipo: userSession.tipo })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return response.status(500).json({ message: 'Error al iniciar sesión' })
    }
})

//cambio de contraseña
userRouter.post('/change-password', async (request, response) => {
    const { email, passwordActual, passwordNueva } = request.body

    if (passwordActual === passwordNueva){
        return response.status(401).json({ message: 'Contraseña debe ser distinta a la actual' })
    }

    try {
        // Buscar al usuario por email
        const usuario = await user.findOne({ email })
        if (!usuario) {
            return response.status(404).json({ message: 'Usuario no encontrado' })
        }

        // Verificar la contraseña actual
        const passwordValida = await bcrypt.compare(passwordActual, usuario.password)
        if (!passwordValida) {
            return response.status(401).json({ message: 'Contraseña actual incorrecta' })
        }

        // Generar el hash de la nueva contraseña
        const hashedPasswordNueva = await bcrypt.hash(passwordNueva, 10)

        // Actualizar la contraseña del usuario
        usuario.password = hashedPasswordNueva
        await usuario.save()

        response.status(200).json({ message: 'Contraseña cambiada exitosamente' })
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error)
        response.status(500).json({ message: 'Error al cambiar la contraseña' })
    }
})

//recuperar contraseña
userRouter.post('/forgot-password', async (request, response) => {
    const { email } = request.body

    try {
        const usuario = await user.findOne({ email })
        if (!usuario) {
            return response.status(404).json({ message: 'Usuario no encontrado' })
        }

        // Generar una nueva contraseña aleatoria
        const nuevaContraseña = generarContraseñaAleatoria()
        const hashedPassword = await bcrypt.hash(nuevaContraseña, 10)

        // Actualizar la contraseña del usuario
        usuario.password = hashedPassword
        await usuario.save()

        // Configurar el transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        // Configurar el correo electrónico
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Recuperacion de contraseña',
            text: `Hola ${usuario.pnombre},\n\nTu nueva contraseña es: ${nuevaContraseña}\n\nCambiala por una facil de recordar.`
        }

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        response.status(200).json({ message: 'Nueva contraseña enviada a su correo electrónico' })
    } catch (error) {
        console.error('Error al enviar el correo de recuperación:', error)
        response.status(500).json({ message: 'Error al enviar el correo de recuperación' })
    }
})

// Ruta para verificar el token
userRouter.get('/verify/:token', async (request, response) => {
    const { token } = request.params

    try {
        const userSession = await user.findOne({ verificationToken: token })

        if (!user) {
            console.error('Token de verificación inválido:', token)
            return response.status(400).json({ message: 'Token de verificación inválido' })
        }

        userSession.verificacion = true
        userSession.verificationToken = undefined // Elimina el token después de la verificación
        await userSession.save()

        response.status(200).json({ message: 'Cuenta verificada exitosamente' })
    } catch (error) {
        console.error('Error al verificar la cuenta:', error)
        response.status(500).json({ message: 'Error al verificar la cuenta' })
    }
})

userRouter.post('/logout', (request, response) => {
    response.clearCookie('userSession')
    response.clearCookie('userType')
    response.status(200).json({ message: 'Sesión cerrada exitosamente' })
})

module.exports = userRouter
