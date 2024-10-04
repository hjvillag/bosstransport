function verifyRole(role) {
    return function (req, res, next) {
        let user
        try {
            user = JSON.parse(req.cookies.userSession)
        } catch (error) {
            console.log('Error al parsear la cookie:', error)
            return res.status(403).json({ message: 'Acceso denegado' })
        }
        
        console.log('Cookie userSession:', user)
       
        if (user && user.tipo === role) {
            next()
        } else {
            console.log('Acceso denegado. Rol requerido:', role, 'Rol del usuario:', user ? user.tipo : 'No definido')
            res.status(403).json({ message: 'Acceso denegado' })
        }
    }
}

module.exports = verifyRole