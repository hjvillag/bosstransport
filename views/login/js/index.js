const formulario = document.querySelector('#formulario')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const btnLogin = document.querySelector('#form-btn')

const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

let valemail = false
let valpass = false
let recaptchaValid = false

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(e.target.value)
    validar(emailInput, valemail)
})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(e.target.value)
    validar(passwordInput, valpass)
})

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    if (!emailInput.value || !passwordInput.value) {
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }

    const recaptchaResponse = grecaptcha.getResponse()
    if (!recaptchaResponse) {
        mostrarAlerta('Por favor, completa el reCAPTCHA')
        return
    }

    try {
        if (valemail && valpass) {
            const response = await axios.post('/api/usuarios/login', {
                email: emailInput.value,
                password: passwordInput.value,
                recaptcha: recaptchaResponse
            })

            const { message, user, tipo } = response.data

            if (response.status === 200) {
                if (message === 'Autenticación exitosa') {
                    mostrarConfirmacion(message)

                    if (tipo === 'Administrador') {
                        window.location.href = '/dashboard/admin/'
                    } else if (tipo === 'Usuario') {
                        window.location.href = '/dashboard/users/'
                    } else if (tipo === 'Inactivo') {
                        mostrarAlerta(message)
                    }
                }
            } else {
                mostrarAlerta(message)
            }
        } else {
            mostrarAlerta('Todos los campos son obligatorios')
        }
    } catch (error) {
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
    btnLogin.disabled = !(valemail && valpass)
    if(btnLogin.disabled) {
        btnLogin.classList.remove('hover:bg-blue-400','bg-slate-950','border-blue-400')
        btnLogin.classList.add('bg-gray-400/70','cursor-not-allowed','border-gray-400')
    }else{
        btnLogin.classList.remove('bg-gray-400/70','cursor-not-allowed','border-gray-400')
        btnLogin.classList.add('hover:bg-blue-400','bg-slate-950','border-blue-400')
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