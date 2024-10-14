const nuevoUsuario = async usuario=>{
    try{
        const response = await axios.post('/api/usuarios',usuario)
    }catch(error){
        console.log(error)
    }
}

const obtenerUsuarios = async ()=>{
    try{
        const response = await axios.get('/api/usuarios')
        const usuarios = response.data
        return usuarios
    }catch(error){
        console.log(error)
    }
}

const pnombreInput = document.querySelector('#pnombre-input')
const snombreInput = document.querySelector('#snombre-input')
const papellidoInput = document.querySelector('#papellido-input')
const sapellidoInput = document.querySelector('#sapellido-input')
const cedulaInput = document.querySelector('#cedula-input')
const fnacimientoInput = document.querySelector('#fnacimiento-input')
const telefonoInput = document.querySelector('#telefono-input')
const emailInput = document.querySelector('#email-input')
const tipoInput = document.querySelector('#tipo-input')
const btnSubmit = document.querySelector('#form-btn')

const pnombreVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/
const snombreVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/
const papellidoVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/
const sapellidoVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/
const cedulaVal = /^\d{1,8}$/
const fnacimientoVal = /\b(19|20)\d\d\b/g
const telefonoVal = /^\d{1,11}$/
const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const tipoVal = /^[a-zA-Z]+$/

let valpnombre = false
let valsnombre = false
let valpapellido = false
let valsapellido = false
let valcedula = false
let valfnacimiento = false
let valtelefono = false
let valemail = false
let valtipo = false

pnombreInput.addEventListener('input',e=>{
    valpnombre = pnombreVal.test(e.target.value)
    validate(pnombreInput,valpnombre)
})

snombreInput.addEventListener('input',e=>{
    valsnombre = snombreVal.test(e.target.value)
    validate(snombreInput,valsnombre)
})

papellidoInput.addEventListener('input',e=>{
    valpapellido = papellidoVal.test(e.target.value)
    validate(papellidoInput,valpapellido)
})

sapellidoInput.addEventListener('input',e=>{
    valsapellido = sapellidoVal.test(e.target.value)
    validate(sapellidoInput,valsapellido)
})

cedulaInput.addEventListener('input',e=>{
    valcedula = cedulaVal.test(e.target.value)
    validate(cedulaInput,valcedula)
})

fnacimientoInput.addEventListener('input',e=>{
    valfnacimiento = fnacimientoVal.test(e.target.value)
    validate(fnacimientoInput,valfnacimiento)
})

telefonoInput.addEventListener('input',e=>{
    valtelefono = telefonoVal.test(e.target.value)
    validate(telefonoInput,valtelefono)
})

emailInput.addEventListener('input',e=>{
    valemail = emailVal.test(e.target.value)
    validate(emailInput,valemail)
})

tipoInput.addEventListener('input',e=>{
    valtipo = tipoVal.test(e.target.value)
    validate(tipoInput,valtipo)
})

function validateInputCedula(input) {
    if (input.value.length > 8) {
        input.value = input.value.slice(0, 8);
    }else if (input.value < 0) {
        input.value = '';
    }
}

function validateInputTlf(input) {
    if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);
    }else if (input.value < 0) {
        input.value = '';
    }
}

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit',validarUsuario)

async function validarUsuario(e){
    e.preventDefault()

    if(valpnombre && valsnombre && valpapellido && valsapellido && valcedula && valfnacimiento && valtelefono && valemail && valtipo){
        const pnombre = pnombreInput.value
        const snombre = snombreInput.value
        const papellido = papellidoInput.value
        const sapellido = sapellidoInput.value
        const cedula = cedulaInput.value
        const fnacimiento = fnacimientoInput.value
        const telefono = telefonoInput.value
        const email = emailInput.value
        const tipo = tipoInput.value

        const usuario = {
            pnombre,
            snombre,
            papellido,
            sapellido,
            cedula,
            fnacimiento,
            telefono,
            email,
            tipo,
        }
    
        const usuarios = await obtenerUsuarios()
    
        const cedulaExistente = usuarios.some(u => u.cedula.toLowerCase() === cedula.toLowerCase())
        const telefonoExistente = usuarios.some(u => u.telefono.toLowerCase() === telefono.toLowerCase())
        const correoExistente = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())
    
        if (cedulaExistente) {
            mostrarAlerta('Usuario ya existe: cedula registrada')
            return
        }else if (telefonoExistente) {
            mostrarAlerta('Telefono ya registrado')
            return
        }else if (correoExistente) {
            mostrarAlerta('Correo ya registrado')
            return
        }else if(validar(usuario)){
            //console.log('Todos los campos son obligatorios')
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }else{
            await nuevoUsuario(usuario)
            mostrarConfirmacion('Registro exitoso')
            window.location.href= '/dashboard/admin/usuarios'
        }
    }else{
        mostrarAlerta('Todos los campos son obligatorios')
    }
}

function validar(obj){
    return !Object.values(obj).every(i=>i!=='')
}

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    
    if(!alerta){
        const alert = document.createElement('p')
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded-lg','text-center')
        alert.innerHTML = mensaje
        formulario.appendChild(alert)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}

function mostrarConfirmacion(mensaje){
    const confirmacion = document.querySelector('.bg-green-100')
    
    if(!confirmacion){
        const confirmar = document.createElement('p')
        confirmar.classList.add('bg-green-100','border-green-400','text-green-700','px-4','py-3','rounded-lg','text-center')
        confirmar.innerHTML = mensaje
        formulario.appendChild(confirmar)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}

const validate = (input, val) => {
    btnSubmit.disabled = !(valpnombre && valsnombre && valpapellido && valsapellido && valcedula && valfnacimiento && valtelefono && valemail && valtipo)
    if(btnSubmit.disabled) {
        btnSubmit.classList.remove('hover:bg-blue-400','bg-slate-950','border-blue-400')
        btnSubmit.classList.add('bg-gray-400/70','cursor-not-allowed','border-gray-400')
    }else{
        btnSubmit.classList.remove('bg-gray-400/70','cursor-not-allowed','border-gray-400')
        btnSubmit.classList.add('hover:bg-blue-400','bg-slate-950','border-blue-400')
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