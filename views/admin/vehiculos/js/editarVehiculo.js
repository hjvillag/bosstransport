const obtenerVehiculo = async id =>{
    try{
        const response = await axios.get(`/api/vehiculos/${id}`)
        const vehiculo = await response.data
        return vehiculo
    }catch(error){
        console.log(error)
    }
}

const editarVehiculo = async vehiculo =>{
    try{
        const response = await axios.put(`/api/vehiculos/${vehiculo.id}`,vehiculo)
        console.log(response)
    }catch(error){
        console.log(error)
    }
}

const obtenerVehiculos = async ()=>{
    try{
        const response = await axios.get('/api/vehiculos')
        const vehiculos = await response.data
        return vehiculos
    }catch(error){
        console.log(error)
    }
}

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const tipoInput = document.querySelector('#tipo-input')
const kmInput = document.querySelector('#km-input')
const estadoInput = document.querySelector('#estado-input')
const ubicacionInput = document.querySelector('#ubicacion-input')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')
const btnSubmit = document.querySelector('#form-btn')

const marcaVal = /^[A-Z][a-zA-Z0-9-]*( [a-zA-Z0-9-]+)?$/
const modeloVal = /^[A-Z][a-zA-Z0-9-]*( [a-zA-Z0-9-]+)?$/
const añoVal = /\b(19|20)\d\d\b/g
const placaVal = /^[A-Z]{3}-\d{4}$/
const kmVal = /^\d{1,6}(\.\d{1,2})?$/
const tipoVal = /^(\w+)(\s+\w+)?(\s+\w+)?$/
const estadoVal = /^(\w+)(\s+\w+)?(\s+\w+)?$/
const ubicacionVal = /^(\w+)(\s+\w+)?(\s+\w+)?$/

let valMarca = true
let valModelo = true
let valAño = true
let valPlaca = true
let valKM = true
let valTipo = true
let valEstado = true
let valUbicacion = true

marcaInput.addEventListener('input',e=>{
    valMarca = marcaVal.test(e.target.value)
    validate(marcaInput,valMarca)
})

modeloInput.addEventListener('input',e=>{
    valModelo = modeloVal.test(e.target.value)
    validate(modeloInput,valModelo)
})

añoInput.addEventListener('input',e=>{
    valAño = añoVal.test(e.target.value)
    validate(añoInput,valAño)
})

placaInput.addEventListener('input',e=>{
    valPlaca = placaVal.test(e.target.value)
    validate(placaInput,valPlaca)
})

kmInput.addEventListener('input',e=>{
    valKM = kmVal.test(e.target.value)
    validate(kmInput,valKM)
})

tipoInput.addEventListener('input',e=>{
    valTipo = tipoVal.test(e.target.value)
    validate(tipoInput,valTipo)
})

estadoInput.addEventListener('input',e=>{
    valEstado = estadoVal.test(e.target.value)
    validate(estadoInput,valEstado)
})

ubicacionInput.addEventListener('input',e=>{
    valUbicacion = ubicacionVal.test(e.target.value)
    validate(ubicacionInput,valUbicacion)
})

function validateInput(input) {
    if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
    }else if (input.value < 0) {
        input.value = '';
    }
}

function validateInputYear(input) {
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    }else if (input.value < 0) {
        input.value = '';
    }
}

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el vehiculo exista
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(window.location.search)
    const idVehiculo = parametroURL.get('id')
    //console.log(idVehiculo)
    const vehiculo = await obtenerVehiculo(idVehiculo)
    //console.log(vehiculo)
    mostrarVehiculo(vehiculo)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarVehiculo)
})

function mostrarVehiculo(vehiculo){
    const {marca,modelo,año,placa,tipo,km,estado,ubicacion,id} = vehiculo

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    tipoInput.value = tipo
    kmInput.value = km
    estadoInput.value = estado
    ubicacionInput.value = ubicacion
    idInput.value = id
}

async function validarVehiculo(e){
    e.preventDefault()
    if(valMarca && valModelo && valAño && valPlaca && valTipo && valEstado && valUbicacion){
        const vehiculo = {
            marca:marcaInput.value,
            modelo:modeloInput.value,
            año:añoInput.value,
            placa:placaInput.value,
            tipo:tipoInput.value,
            km:kmInput.value,
            estado:estadoInput.value,
            ubicacion:ubicacionInput.value,
            id:idInput.value
        }
    
        const vehiculos = await obtenerVehiculos();
        const placaExistente = vehiculos.some(v => v.placa.toLowerCase() === placaInput.value.toLowerCase() && v.id.toLowerCase() !== idInput.value.toLowerCase())
        
        if (placaExistente) {
            mostrarAlerta('La placa ingresada ya esta registrada');
            return;
        }else if(validar(vehiculo)){
            //console.log('Todos los campos son obligatorios')
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }else{
            await editarVehiculo(vehiculo)
            mostrarConfirmacion('Modificacion exitosa')
            window.location.href= '/dashboard/admin/vehiculos/'
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
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','text-center')
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
        confirmar.classList.add('bg-green-100','border-green-400','text-green-700','px-4','py-3','rounded','text-center')
        confirmar.innerHTML = mensaje
        formulario.appendChild(confirmar)

        setTimeout(()=>{
            alert.remove()
        },3000)
    }
}

const validate = (input, val) => {
    btnSubmit.disabled = !(valMarca && valModelo && valAño && valPlaca && valTipo && valEstado && valUbicacion)
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