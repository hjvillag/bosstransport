const obtenerRuta = async id =>{
    try{
        const response = await axios.get(`/api/rutas/${id}`)
        const ruta = await response.data
        return ruta
    }catch(error){
        console.log(error)
    }
}

const editarRuta = async ruta =>{
    try{
       const response = await axios.put(`/api/rutas/${ruta.id}`,ruta)
    }catch(error){
        console.log(error)
    }
}

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
    }catch(error){
        console.log(error)
    }
}

const fechaInput = document.querySelector('#fecha-input')
const origenInput = document.querySelector('#origen-input')
const destinoInput = document.querySelector('#destino-input')
const distanciaInput = document.querySelector('#distancia-input')
const tiempoInput = document.querySelector('#tiempo-input')
const vehiculoInput = document.querySelector('#vehiculo-input')
const kmInput = document.querySelector('#km-input')
const detallesInput = document.querySelector('#detalles-input')
const fechaFinalInput = document.querySelector('#fecha-final-input')
const estadoFinalInput = document.querySelector('#estado-cierre-input')
const kmFinalInput = document.querySelector('#km-final-input')
const detallesFinalInput = document.querySelector('#detalles-final-input')
const estadoRutaInput = document.querySelector('#estadoRuta-input')
const usuarioInput = document.querySelector('#usuario-input')
const usuarioEdit = document.querySelector('#usuarioEdit-input')

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const tipoInput = document.querySelector('#tipo-input')
const idVehiculoInput = document.querySelector('#idVehiculo')
const ubicacionInput = document.querySelector('#ubicacion-input')

const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')

const kmFinalVal = /^\d{1,6}(\.\d{1,2})?$/

let valKMFinal = false

kmFinalInput.addEventListener('input',e=>{
    valKMFinal = kmFinalVal.test(e.target.value)
    validate(kmFinalInput,valKMFinal)
})

function validateInput(input) {
    if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
    }else if (input.value < 0) {
        input.value = '';
    }
}

//validacion de fechas
const hoy = new Date().toISOString().split('T')[0]
fechaFinalInput.min = hoy

fechaFinalInput.addEventListener('change', () => {
    if (new Date(fechaFinalInput.value) < new Date(fechaInput.value)) {
      alert('La fecha de cierre no puede ser anterior a la fecha de inicio.')
      fechaFinalInput.value = fechaInput.value
    }
})

if (kmFinalInput.value < kmInput.value) {
    mostrarAlerta('KM final invalido')
}

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!fechaInput.disabled || !origenInput.disabled || !destinoInput.disabled || !distanciaInput.disabled || !tiempoInput.disabled || !vehiculoInput.disabled || !kmInput.disabled || !detallesInput.diasbled) {
        fechaInput.disabled = true
        origenInput.disabled = true
        destinoInput.disabled = true
        distanciaInput.disabled = true
        tiempoInput.disabled = true
        vehiculoInput.disabled = true
        kmInput.disabled = true
        detallesInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el registro exista
    const parametroURL = new URLSearchParams(window.location.search)
    const idRuta = parametroURL.get('id')
    const ruta = await obtenerRuta(idRuta)
    
    const idVehiculo = ruta.idVehiculo
    const vehiculo = await obtenerVehiculo(idVehiculo)
    
    mostrarRuta(ruta)
    mostrarVehiculo(vehiculo)

    //registro de la actualizacion del producto
    formulario.addEventListener('submit',validarRuta)
    formulario.addEventListener('submit',validarVehiculo)
})

function mostrarRuta(ruta){
    const {fecha,origen,destino,distancia,tiempo,vehiculo,kmInicial,detalles,idVehiculo,usuario,id} = ruta

    fechaInput.value = fecha
    origenInput.value = origen
    destinoInput.value = destino
    distanciaInput.value = distancia
    tiempoInput.value = tiempo
    vehiculoInput.value = vehiculo
    kmInput.value = kmInicial
    detallesInput.value = detalles
    idInput.value = id
    usuarioInput.value = usuario
}

async function validarRuta(e){
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
    const pnombre = userData.pnombre
    const papellido = userData.papellido

    if (valKMFinal) {
        const ruta = {
            fecha:fechaInput.value,
            origen:origenInput.value,
            destino:destinoInput.value,
            distancia:distanciaInput.value,
            tiempo:tiempoInput.value,
            vehiculo:vehiculoInput.value,
            kmInicial:kmInput.value,
            detalles:detallesInput.value,
            fechaFinal:fechaFinalInput.value,
            estadoFinal:estadoFinalInput.value,
            kmFinal:kmFinalInput.value,
            detallesFinal:detallesFinalInput.value,
            usuario:usuarioInput.value,
            usuarioEdit:pnombre+' '+papellido,
            estadoRuta:estadoRutaInput.value,
            idVehiculo:idVehiculoInput.value,
            id:idInput.value
        }
    
        if(kmFinalInput.value < kmInput.value){
            mostrarAlerta('KM final invalido')
            return false
        }else if(validar(ruta)){
            //console.log('Todos los campos son obligatorios')
            mostrarAlerta('Todos los campos son obligatorios')
            return false
        }else{
            await editarRuta(ruta)
            mostrarConfirmacion('Finalizacion exitosa')
            window.location.href= '/dashboard/admin/rutas'
            return true
        }
    }else{
        mostrarAlerta('Todos los campos son obligatorios')
    }
}

function mostrarVehiculo(vehiculo){
    const {marca,modelo,año,placa,tipo,km,estado,ubicacion,id} = vehiculo

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    tipoInput.value = tipo
    idVehiculoInput.value = id
}

async function validarVehiculo(e){
    e.preventDefault()

    const rutaValida = await validarRuta(e)
    if (!rutaValida) {
        return
    }

    if (valKMFinal) {
        const vehiculo = {
            marca:marcaInput.value,
            modelo:modeloInput.value,
            año:añoInput.value,
            placa:placaInput.value,
            tipo:tipoInput.value,
            km:kmFinalInput.value,
            estado:estadoFinalInput.value,
            ubicacion:obtenerUbicacion(estadoFinalInput.value),
            id:idVehiculoInput.value
        }
    
        function obtenerUbicacion(estado) {
            let ubicacion;
            switch (estado) {
                case 'Ocupado':
                    ubicacion = 'Campo';
                    break;
                case 'Disponible':
                    ubicacion = 'Patios';
                    break;
                default:
                    ubicacion = null;
            }
            return ubicacion;
        }
    
        if(validar(vehiculo)){
            return
        }else{
            await editarVehiculo(vehiculo)
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
    input.classList.remove('focus:outline-blue-600', 'focus:outline-red-700', 'focus:outline-green-700', 'outline-4')
    if (val) {
        input.classList.add('focus:outline-green-700', 'outline-4')
    } else if (input.value === '') {
        input.classList.add('focus:outline-blue-600')
    } else {
        input.classList.add('focus:outline-red-700', 'outline-4')
    }
}