const obtenerRuta = async id =>{
    try{
        const response = await axios.get(`/api/rutas/${id}`)
        const ruta = await response.data
        return ruta
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

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const tipoInput = document.querySelector('#tipo-input')
const idVehiculoInput = document.querySelector('#idVehiculo')
const ubicacionInput = document.querySelector('#ubicacion-input')

const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!fechaInput.disabled || !origenInput.disabled || !destinoInput.disabled || !distanciaInput.disabled || !tiempoInput.disabled || !vehiculoInput.disabled || !kmInput.disabled || !detallesInput.disabled || !fechaFinalInput.disabled || !estadoFinalInput.disabled || !kmFinalInput.disabled || !detallesFinalInput.disabled ) {
        fechaInput.disabled = true
        origenInput.disabled = true
        destinoInput.disabled = true
        distanciaInput.disabled = true
        tiempoInput.disabled = true
        vehiculoInput.disabled = true
        kmInput.disabled = true
        detallesInput.disabled = true
        fechaFinalInput.disabled = true
        estadoFinalInput.disabled = true
        kmFinalInput.disabled = true
        detallesFinalInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el registro exista
    const parametroURL = new URLSearchParams(window.location.search)
    const idRuta = parametroURL.get('id')
    const ruta = await obtenerRuta(idRuta)
    
    mostrarRuta(ruta)
})

function mostrarRuta(ruta){
    const {fecha,origen,destino,distancia,tiempo,vehiculo,kmInicial,detalles,fechaFinal,estadoFinal,kmFinal,detallesFinal,id} = ruta

    fechaInput.value = fecha
    origenInput.value = origen
    destinoInput.value = destino
    distanciaInput.value = distancia
    tiempoInput.value = tiempo
    vehiculoInput.value = vehiculo
    kmInput.value = kmInicial
    detallesInput.value = detalles
    fechaFinalInput.value = fechaFinal
    estadoFinalInput.value = estadoFinal
    kmFinalInput.value = kmFinal
    detallesFinalInput.value = detallesFinal
    idInput.value = id
}

async function exportarPDF() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    const ruta = await obtenerRuta(idInput.value)

    const { fecha, origen, destino, distancia, tiempo, vehiculo, kmInicial, detalles, fechaFinal, estadoFinal, kmFinal, detallesFinal, usuario } = ruta

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(40, 40, 40)
    doc.text(`Reporte de Ruta: ${idInput.value}`, 105, 20, null, null, 'center')

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 30, null, null, 'center')

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Datos de la ruta', 14, 40)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha y hora: ${fecha}`, 14, 50)
    doc.text(`Origen: ${origen.toUpperCase()}`, 14, 60)
    doc.text(`Destino: ${destino.toUpperCase()}`, 14, 70)
    doc.text(`Distancia aproximada: ${distancia} KM`, 14, 80)
    doc.text(`Tiempo estimado: ${tiempo} minutos`, 14, 90)
    doc.text(`Vehiculo: ${vehiculo.toUpperCase()}`, 14, 100)
    doc.text(`KM inicial: ${kmInicial} KM`, 14, 110)
    doc.text(`Detalles: ${detalles.toUpperCase()}`, 14, 120)

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Resultado', 14, 140)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha de cierre: ${fechaFinal}`, 14, 150)
    doc.text(`Estado del vehiculo: ${estadoFinal.toUpperCase()}`, 14, 160)
    doc.text(`KM final: ${kmFinal} KM`, 14, 170)
    doc.text(`Detalles: ${detallesFinal.toUpperCase()}`, 14, 180)

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Firma', 14, 200)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('_________________________', 14, 210)
    doc.text(`${usuario}`, 14, 220)

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, `Reporte_Ruta_${idInput.value}.pdf`)
}

document.getElementById('exportarPDF').addEventListener('click', function(e) {
    e.preventDefault()

    if(!fechaFinalInput.value || !estadoFinalInput.value || !kmFinalInput.value || !detallesFinalInput.value){
        alert('Debe finalizar la ruta para exportar')
        return
    }
    exportarPDF()
})