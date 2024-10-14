const obtenerRegistro = async id =>{
    try{
        const response = await axios.get(`/api/mantenimiento/${id}`)
        const registro = response.data
        return registro
    }catch(error){
        console.log(error)
    }
}

const marcaInput = document.querySelector('#marca-input')
const modeloInput = document.querySelector('#modelo-input')
const añoInput = document.querySelector('#año-input')
const placaInput = document.querySelector('#placa-input')
const fechaProgramadaInput = document.querySelector('#fechaProgramada-input')
const mantenimientoInput = document.querySelector('#mantenimiento-input')
const detallesInput = document.querySelector('#detalles-input')
const fechaCierreInput = document.querySelector('#fechaCierre-input')
const resultadoInput = document.querySelector('#resultado-input')
const detallesCierreInput = document.querySelector('#detallesCierre-input')
const idInput = document.querySelector('#id')

//validacion de input deshabilitados
function asegurarDisabled() {
    if (!marcaInput.disabled || !modeloInput.disabled || !añoInput.disabled || !placaInput.disabled || !fechaProgramadaInput.disabled || !mantenimientoInput.disabled || !detallesInput.disabled || !fechaCierreInput.disabled || !resultadoInput.disabled || !detallesCierreInput.disabled) {
        marcaInput.disabled = true
        modeloInput.disabled = true
        añoInput.disabled = true
        placaInput.disabled = true
        fechaProgramadaInput.disabled = true
        mantenimientoInput.disabled = true
        detallesInput.disabled = true
        fechaCierreInput.disabled = true
        resultadoInput.disabled = true
        detallesCierreInput.disabled = true
    }
}
setInterval(asegurarDisabled, 1000)

document.addEventListener('DOMContentLoaded',async()=>{
    //verificar que el registro exista
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(window.location.search)
    const idRegistro = parametroURL.get('id')
    //console.log(idRegistro)
    const registro = await obtenerRegistro(idRegistro)
    //console.log(registro)
    mostrarRegistro(registro)
})

function mostrarRegistro(registro){
    const {marca,modelo,año,placa,fechaProgramada,mantenimiento,detalles,fechaCierre,resultado,detallesCierre,id} = registro

    marcaInput.value = marca
    modeloInput.value = modelo
    añoInput.value = año
    placaInput.value = placa
    fechaProgramadaInput.value = fechaProgramada
    mantenimientoInput.value = mantenimiento
    detallesInput.value = detalles
    fechaCierreInput.value = fechaCierre
    resultadoInput.value = resultado
    detallesCierreInput.value = detallesCierre
    idInput.value = id
}

async function exportarPDF() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    const registro = await obtenerRegistro(idInput.value)

    const { marca, modelo, año, placa, fechaProgramada, mantenimiento, detalles, fechaCierre, resultado, detallesCierre, usuario } = registro

    // Estilos corporativos
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(40, 40, 40)
    doc.text(`Reporte de Mantenimiento: ${idInput.value}`, 105, 20, null, null, 'center')

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 30, null, null, 'center')

    // Datos del vehículo
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Datos del Vehículo', 14, 40)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Marca: ${marca.toUpperCase()}`, 14, 50)
    doc.text(`Modelo: ${modelo.toUpperCase()}`, 14, 60)
    doc.text(`Año: ${año}`, 14, 70)
    doc.text(`Placa: ${placa.toUpperCase()}`, 14, 80)

    // Datos del mantenimiento
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Datos del Mantenimiento', 14, 100)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Fecha Programada: ${fechaProgramada}`, 14, 110)
    doc.text(`Mantenimiento: ${mantenimiento.toUpperCase()}`, 14, 120)
    doc.text(`Detalles de Ingreso: ${detalles.toUpperCase()}`, 14, 130)
    doc.text(`Fecha de Cierre: ${fechaCierre}`, 14, 140)
    doc.text(`Resultado: ${resultado.toUpperCase()}`, 14, 150)
    doc.text(`Detalles de Cierre: ${detallesCierre.toUpperCase()}`, 14, 160)

    // Campo para firma
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Firma', 14, 180)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('_________________________', 14, 190)
    doc.text(`${usuario}`, 14, 200)

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, `Reporte_Mantenimiento_${idInput.value}.pdf`)
}

document.getElementById('exportarPDF').addEventListener('click', function(e) {
    e.preventDefault()

    if(!fechaCierreInput.value || !resultadoInput.value || !detallesCierreInput.value){
        alert('Debe finalizar el mantenimiento para exportar')
        return
    }
    exportarPDF()
})