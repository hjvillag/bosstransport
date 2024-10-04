const formulario = document.querySelector('#formulario')
const emailInput = document.querySelector('#email-input')
const btnForgot = document.querySelector('#form-btn')

const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let valemail = false

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    if (!emailInput.value) {
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }

    try {
        if (valemail) {
            const response = await axios.post('/api/usuarios/forgot-password', {
                email: emailInput.value
            })
    
            const { message } = response.data
    
            if (response.status === 200) {
                mostrarConfirmacion(message)
            } else {
                mostrarAlerta(message)
            }
        }else{
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }
        
    } catch (error) {
        console.error('Error en la solicitud:', error)
        if (error.response && error.response.data && error.response.data.message) {
            mostrarAlerta(error.response.data.message)
        } else {
            mostrarAlerta('Error al conectar con el servidor')
        }
    }
})

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

    if (!alerta) {
        const alert = document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded-lg', 'text-center')
        alert.innerHTML = mensaje
        formulario.appendChild(alert)

        setTimeout(() => {
            alert.remove()
        }, 3000)
    }
}

function mostrarConfirmacion(mensaje) {
    const confirmacion = document.querySelector('.bg-green-100')

    if (!confirmacion) {
        const confirmar = document.createElement('p')
        confirmar.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded-lg', 'text-center')
        confirmar.innerHTML = mensaje
        formulario.appendChild(confirmar)

        setTimeout(() => {
            confirmar.remove()
        }, 3000)
    }
}

const validar = (input, val) => {
    btnForgot.disabled = (!valemail)
    if(btnForgot.disabled) {
        btnForgot.classList.remove('hover:bg-blue-400','bg-slate-950','border-blue-400')
        btnForgot.classList.add('bg-gray-400/70','cursor-not-allowed','border-gray-400')
    }else{
        btnForgot.classList.remove('bg-gray-400/70','cursor-not-allowed','border-gray-400')
        btnForgot.classList.add('hover:bg-blue-400','bg-slate-950','border-blue-400')
    }

    input.classList.remove('focus:outline-blue-600', 'focus:outline-red-700', 'focus:outline-green-700', 'outline-4')
    if (val) {
        input.classList.add('focus:outline-green-700', 'outline-4')
    } else if (input.value === '') {
        input.classList.add('focus:outline-blue-600')
    } else {
        input.classList.add('focus:outline-red-700', 'outline-4')
    }
}