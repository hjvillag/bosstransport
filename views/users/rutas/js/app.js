const obtenerRutas = async ()=>{
    try{
        const response = await axios.get('/api/rutas')
        const rutas = response.data
        return rutas
    }catch(error){
        console.log(error)
    }
}

const eliminarRuta = async id =>{
    try{
        const response = axios.delete(`/api/rutas/${id}`)
    }catch(error){
        console.log(error)
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const userDataCookies = getCookie('userSession')
const decodedCookies = decodeURIComponent(userDataCookies)
const userCookie = JSON.parse(decodedCookies)
const usuarioActual = userCookie.pnombre + ' ' + userCookie.papellido
console.log(usuarioActual)

const listado = document.querySelector('#listado-Rutas')

document.addEventListener('DOMContentLoaded',mostrarRutas)
listado.addEventListener('click',confirmarEliminar)

async function mostrarRutas(){
    const rutas = await obtenerRutas()
    //console.log(rutas)

    rutas.forEach(ruta=>{
        const {fecha,origen,destino,distancia,tiempo,vehiculo,usuario,usuarioEdit,estadoRuta,idVehiculo} = ruta
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fecha}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${origen}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${destino}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${distancia}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tiempo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${vehiculo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${usuario}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estadoRuta}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div>
                    <a id="finalizar" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="finalizar.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </a>

                    <a class="text-green-600 font-bold hover:text-green-900 grid justify-center" href="ver.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </a>
                </div>
            </td>
        `
        listado.appendChild(fila)

        const btnFinalizar = fila.querySelectorAll('#finalizar')
        btnFinalizar.forEach(boton => {
            if (estadoRuta === 'Finalizado') {
                boton.classList.remove('text-orange-600')
                boton.classList.add('text-orange-900', 'pointer-events-none')
            }
        })
    })
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const rutaId = (e.target.dataset.ruta)
        //console.log(rutaId)

        const confirmar = confirm('¿Desea eliminar esta ruta?')

        if(confirmar){
            await eliminarRuta(rutaId)
            location.reload()
        }
    }
}

//buscador
const inputBuscar = document.querySelector('#buscar')

inputBuscar.addEventListener('keyup',buscarRuta)

async function mostrarRutas(){
    const rutas = await obtenerRutas()
    let rutasFiltradas = rutas.filter(ruta => ruta.usuario === usuarioActual)

    rutasFiltradas.forEach((ruta)=>{
        const {fecha,origen,destino,distancia,tiempo,vehiculo,usuario,usuarioEdit,estadoRuta,id} = ruta
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fecha}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${origen}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${destino}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${distancia}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tiempo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${vehiculo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${usuario}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estadoRuta}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div>
                    <a id="finalizar" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="finalizar.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </a>

                    <a class="text-green-600 font-bold hover:text-green-900 grid justify-center" href="ver.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </a>
                </div>
            </td>
        `
        listado.appendChild(fila)

        const btnFinalizar = fila.querySelectorAll('#finalizar')
        btnFinalizar.forEach(boton => {
            if (estadoRuta === 'Finalizado') {
                boton.classList.remove('text-orange-600')
                boton.classList.add('text-orange-900', 'pointer-events-none')
            }
        })
    })
}

async function buscarRuta(e){
    const terminoBusqueda = e.target.value.toLowerCase()
    const rutas = await obtenerRutas()
    let rutasFiltradas = rutas.filter(ruta => ruta.usuario === usuarioActual)
    let buscarRutas = rutasFiltradas.filter((ruta)=>{
        const { fecha, origen, destino, vehiculo, usuario, usuarioEdit, estadoRuta } = ruta
        const rutaString = `${fecha} ${origen} ${destino} ${vehiculo} ${usuario} ${usuarioEdit} ${estadoRuta}`.toLowerCase();
        return rutaString.includes(terminoBusqueda);
    })

    listado.innerHTML = ''

    buscarRutas.forEach((ruta) => {
        const { fecha, origen, destino, distancia, tiempo, vehiculo, usuario, estadoRuta, id } = ruta
        const fila = document.createElement('tr');
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fecha}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${origen}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${destino}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${distancia}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tiempo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${vehiculo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${usuario}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estadoRuta}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div>
                    <a id="finalizar" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="finalizar.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </a>

                    <a class="text-green-600 font-bold hover:text-green-900 grid justify-center" href="ver.html?id=${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </a>
                </div>
            </td>
        `
        listado.appendChild(fila)

        const btnFinalizar = fila.querySelectorAll('#finalizar')
        btnFinalizar.forEach(boton => {
            if (estadoRuta === 'Finalizado') {
                boton.classList.remove('text-orange-600')
                boton.classList.add('text-orange-900', 'pointer-events-none')
            }
        })
    })
}

function exportarPDF() {
    const doc = new jspdf.jsPDF('landscape')

    const fechaActual = new Date()
    const fechaFormateada = fechaActual.toLocaleDateString()
    const horaFormateada = fechaActual.toLocaleTimeString()

    const listado = document.getElementById('listado-Rutas')
    const filas = listado.querySelectorAll('tr')
    const rows = []
    filas.forEach((fila) => {
        const celdas = fila.querySelectorAll('th')
        const row = []
        celdas.forEach((celda) => {
            row.push(celda.innerText)
        })
        rows.push(row)
    })

    const totalRutas = rows.length

    const columns = ["Fecha y hora", "Origen", "Destino", "KM", "Tiempo estimado", "Vehiculo", "Por", "Estado"]

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        didDrawPage: function (data) {
            doc.text(`Reporte de Rutas ${fechaFormateada} ${horaFormateada}`, data.settings.margin.left, 10)
        }
    })

    const finalY = doc.autoTable.previous.finalY + 10
    doc.autoTable({
        head: [['Total Rutas']],
        body: [[totalRutas]],
        startY: finalY,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        tableWidth: 'wrap'
    })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, `Reporte_Rutas_${fechaFormateada}_${horaFormateada}.pdf`)
}

document.getElementById('exportarPDF').addEventListener('click', exportarPDF)

function exportarExcel() {
    const headers = ["Fecha y hora", "Origen", "Destino", "KM", "Tiempo estimado", "Vehiculo", "Por", "Estado"]
    const listado = document.getElementById('listado-Rutas');
    const filas = listado.querySelectorAll('tr');
    const rows = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('th');
        const row = [];
        celdas.forEach(celda => {
            row.push(celda.innerText);
        });
        rows.push(row);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Rutas");

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString();
    const horaFormateada = fechaActual.toLocaleTimeString();

    XLSX.writeFile(wb, `Reporte_Rutas_${fechaFormateada}_${horaFormateada}.xlsx`);
}

document.getElementById('exportarExcel').addEventListener('click', exportarExcel)