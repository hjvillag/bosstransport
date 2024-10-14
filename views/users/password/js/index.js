const formulario = document.querySelector('#formulario')
const passwordActualInput = document.querySelector('#passwordActual-input')
const passwordNuevaInput = document.querySelector('#passwordNueva-input')
const passwordConfirmInput = document.querySelector('#passwordConfirm-input')
const emailInput = document.querySelector('#email-input')
const btnChange = document.querySelector('#form-btn')

const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

let valPass = false
let valPassNew = false
let valMatch = false

passwordActualInput.addEventListener('input',e=>{
    valPass = passwordVal.test(e.target.value)
    validar(passwordActualInput,valPass)
})

passwordNuevaInput.addEventListener('input',e=>{
    valPassNew = passwordVal.test(e.target.value)
    validar(passwordNuevaInput,valPassNew)
    validar(passwordConfirmInput,valMatch)
})

passwordConfirmInput.addEventListener('input',e=>{
    valMatch = e.target.value === passwordNuevaInput.value
    validar(passwordConfirmInput,valMatch)
    validar(passwordNuevaInput,valPassNew)
})

formulario.addEventListener('submit', async e => {
    e.preventDefault()

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const userDataCookie = getCookie('userSession')
    const decodedCookie = decodeURIComponent(userDataCookie)
    const userData = JSON.parse(decodedCookie)
    const email = userData.email   

    if (passwordNuevaInput.value !== passwordConfirmInput.value) {
        mostrarAlerta('Las nuevas contraseñas no coinciden')
        return
    }

    try {
        if(valPass && valPassNew && valMatch){
            const response = await axios.post('/api/usuarios/change-password', {
                email: email,
                passwordActual: passwordActualInput.value,
                passwordNueva: passwordNuevaInput.value
            })
    
            const { message } = response.data
    
            if (response.status === 200) {
                mostrarConfirmacion(message)
                window.location.href= '/dashboard/users'
            } else {
                mostrarAlerta(message)
            }
        }else{
            mostrarAlerta('Todos los campos son obligatorios')
        }
        
    } catch (error) {
        console.error('Error en la solicitud:', error);
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
    btnChange.disabled = !(valPass && valPassNew && valMatch)
    if(btnChange.disabled) {
        btnChange.classList.remove('hover:bg-blue-400','bg-slate-950','border-blue-400')
        btnChange.classList.add('bg-gray-400/70','cursor-not-allowed','border-gray-400')
    }else{
        btnChange.classList.remove('bg-gray-400/70','cursor-not-allowed','border-gray-400')
        btnChange.classList.add('hover:bg-blue-400','bg-slate-950','border-blue-400')
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