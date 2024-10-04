//mapa
const mapa = document.querySelector('#mapa')

let map = L.map('mapa').setView([10.50300, -66.91000], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

var markerOrigen
var markerDestino
var rutaLayer
var nombreOrigen
var nombreDestino

function buscarLugar(inputId, marker) {
    var consulta = document.getElementById(inputId).value
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`

    return fetch(url)
        .then(response => response.json())
        .then(data => {
        if (data.length > 0) {
            var lugar = data[0]
            if (marker) {
            map.removeLayer(marker)
            }
            marker = L.marker([lugar.lat, lugar.lon]).addTo(map)
            .bindPopup(lugar.name)
            .openPopup()
            return marker // Resolve with the marker object
        } else {
            alert('Lugar no encontrado')
            return null // Resolve with null if not found
        }
        })
        .catch(error => {
        console.error('Error al buscar el lugar:', error)
        return null // Resolve with null in case of error
        })
}

function trazarRuta() {
    if (rutaLayer) {
        map.removeLayer(rutaLayer)
    }

    Promise.all([buscarLugar('origen', markerOrigen), buscarLugar('destino', markerDestino)])
    .then(markers => {
    markerOrigen = markers[0]
    markerDestino = markers[1]
    nombreOrigen = markers[0]._popup._content
    nombreDestino = markers[1]._popup._content

    origenInput.value = nombreOrigen
    destinoInput.value = nombreDestino

    if (markerOrigen && markerDestino) {
        var origen = markerOrigen.getLatLng()
        var destino = markerDestino.getLatLng()

        var url = `https://router.project-osrm.org/route/v1/driving/${origen.lng},${origen.lat};${destino.lng},${destino.lat}?overview=full`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data) // Inspecciona la respuesta completa para verificar la estructura

            if (data.routes && data.routes.length > 0) {
            // Limpia el contenedor de resultados antes de agregar nuevos
            const resultsDiv = document.getElementById('resultados')
            resultsDiv.innerHTML = ''

            data.routes.forEach(route => {
                const distance = route.distance / 1000
                const duration = parseInt(route.duration / 60)

                distanciaInput.value = distance
                tiempoInput.value = duration

                // Crea un párrafo para cada ruta con la distancia y duración
                const paragraph = document.createElement('p')
                paragraph.textContent = `Distancia: ${distance} km, Duración: ${duration} minutos`
                resultsDiv.appendChild(paragraph)
            });

            // Verifica que geometry y coordinates existen antes de usarlos
            if (data.routes[0].geometry) {
                var coordinates = polyline.decode(data.routes[0].geometry)
                rutaLayer = L.polyline(coordinates, { color: 'blue' }).addTo(map)
            } else {
                console.error('La geometría de la ruta no está disponible')
                alert('La geometría de la ruta no está disponible.')
            }
            } else {
            console.error('No se encontraron rutas')
            alert('No se encontraron rutas entre los puntos seleccionados.')
            }
        })
        .catch(error => {
            console.error('Error al obtener la ruta:', error)
        });
    }
    })
}

function sugerirLugares(inputId, suggestionsId) {
    const input = document.getElementById(inputId)
    const suggestions = document.getElementById(suggestionsId)

    input.addEventListener('input', () => {
        const consulta = input.value
        if (consulta.length < 3) {
        suggestions.innerHTML = ''
        return
        }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${consulta}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            suggestions.innerHTML = ''
            data.forEach(lugar => {
                const item = document.createElement('div')
                item.className = 'suggestion-item'
                item.textContent = lugar.display_name
                item.addEventListener('click', () => {
                    input.value = lugar.display_name
                    suggestions.innerHTML = ''
                })
            suggestions.appendChild(item)
            })
        })
        .catch(error => {
          console.error('Error al sugerir lugares:', error)
        })
    })
}

sugerirLugares('origen', 'origen-suggestions')
sugerirLugares('destino', 'destino-suggestions')

//formulario
const obtenerVehiculo = async id =>{
    try{
        const response = await axios.get(`/api/vehiculos/${id}`)
        const vehiculo = response.data
        return vehiculo
    }catch(error){
        console.log(error)
    }
}

const nuevaRuta = async ruta=>{
    try{
        const response = await axios.post('/api/rutas',ruta)
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

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const tipoInput = document.querySelector('#tipo-input')

const fechaInput = document.querySelector('#fecha-input')
const origenInput = document.querySelector('#origen-input')
const destinoInput = document.querySelector('#destino-input')
const distanciaInput = document.querySelector('#distancia-input')
const tiempoInput = document.querySelector('#tiempo-input')
const vehiculoInput = document.querySelector('#vehiculo-input')
const kmInput = document.querySelector('#km-input')
const detallesInput = document.querySelector('#detalles-input')
const idInput = document.querySelector('#id')
const estadoVehiculoInput = document.querySelector('#estadoVehiculo-input')
const ubicacionInput = document.querySelector('#ubicacion-input')
const estadoRutaInput = document.querySelector('#estadoRuta-input')
const usuarioInput = document.querySelector('#usuario-input')
const fechaFinalInput = document.querySelector('#fecha-final-input')
const estadoFinalInput = document.querySelector('#estado-cierre-input')
const kmFinalInput = document.querySelector('#km-final-input')
const detallesFinalInput = document.querySelector('#detalles-final-input')
const usuarioEdit = document.querySelector('#usuarioEdit-input')
const formulario = document.querySelector('#formulario')
const hoy = new Date().toISOString().split('T')[0]
fechaInput.min = hoy

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!origenInput.disabled || !destinoInput.disabled || !distanciaInput.disabled || !tiempoInput.disabled || !vehiculoInput.disabled || !kmInput.disabled) {
        origenInput.disabled = true
        destinoInput.disabled = true
        distanciaInput.disabled = true
        tiempoInput.disabled = true
        kmInput.disabled = true
        vehiculoInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

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
    formulario.addEventListener('submit',validarRuta)
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
    estadoVehiculoInput.value = estado
    ubicacionInput.value = ubicacion
    idInput.value = id
    vehiculoInput.value = marca + ' ' + modelo + ' ' + placa
}

async function validarRuta() {
    
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

    const ruta = {
        fecha: fechaInput.value,
        origen: origenInput.value,
        destino: destinoInput.value,
        distancia: distanciaInput.value,
        tiempo: tiempoInput.value,
        vehiculo: vehiculoInput.value,
        kmInicial: kmInput.value,
        detalles: detallesInput.value,
        fechaFinal: fechaFinalInput.value,
        estadoFinal: estadoFinalInput.value,
        kmFinal: kmFinalInput.value,
        detallesFinal: detallesFinalInput.value,
        usuarioEdit: usuarioEdit.value,
        usuario: pnombre + ' ' + papellido,
        estadoRuta: estadoRutaInput.value,
        idVehiculo: new URLSearchParams(window.location.search).get('id')
    }

    if (validar(ruta)) {
        mostrarAlerta('Todos los campos son obligatorios')
        return false
    } else {
        return ruta
    }
}

async function registrarRuta(ruta){
    await nuevaRuta(ruta)
    mostrarConfirmacion('Ruta creada exitosamente')
    window.location.href = '/dashboard/users/rutas'
}

async function validarVehiculo(e) {
    e.preventDefault()

    const ruta = await validarRuta()
    if (!ruta) {
        return
    }

    const vehiculo = {
        marca: marcaInput.value,
        modelo: modeloInput.value,
        año: añoInput.value,
        placa: placaInput.value,
        tipo: tipoInput.value,
        km: kmInput.value,
        estado: 'En ruta',
        ubicacion: obtenerUbicacion('En ruta'),
        id: idInput.value
    }

    function obtenerUbicacion(estado) {
        let ubicacion
        switch (estado) {
            case 'En ruta':
                ubicacion = 'Campo'
                break
            default:
                ubicacion = null
        }
        return ubicacion
    }

    if (validar(vehiculo)) {
        return
    } else {
        await editarVehiculo(vehiculo)
        await registrarRuta(ruta)
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

