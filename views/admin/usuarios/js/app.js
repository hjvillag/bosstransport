//const url = 'http://localhost:3000/usuarios'

const obtenerUsuarios = async ()=>{
    try{
        //const resultado = await fetch(url)
        //const usuarios = await resultado.json()
        const response = await axios.get('/api/usuarios')
        const usuarios = response.data
        return usuarios
    }catch(error){
        console.log(error)
    }
}

const eliminarUsuario = async id =>{
    try{
        /*await fetch(`${url}/${id}`,{
            method:'DELETE'
        })*/
        const response = axios.delete(`/api/usuarios/${id}`)
        console.log(response)
    }catch(error){
        console.log(error)
    }
}

const listado = document.querySelector('#listado-Usuarios')

document.addEventListener('DOMContentLoaded',mostrarUsuarios)
listado.addEventListener('click',confirmarEliminar)

async function mostrarUsuarios(){
    const usuarios = await obtenerUsuarios()
    //console.log(usuarios)

    usuarios.forEach(usuario=>{
        const {pnombre,snombre,papellido,sapellido,cedula,fnacimiento,telefono,email,tipo,id} = usuario
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${pnombre} ${snombre} ${papellido} ${sapellido}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${cedula}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fnacimiento}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${telefono}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${email}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <td class="text-center px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <a class="text-teal-600 font-bold hover:text-teal-900 mr-5" href="editar.html?id=${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </a>

                <a class="text-red-600 font-bold hover:text-red-900 eliminar" href="#" data-usuario="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3 pointer-events-none">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </a>
            </td>
        `
        listado.appendChild(fila)
    })
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const usuarioId = (e.target.dataset.usuario)
        //console.log(usuarioId)

        const confirmar = confirm('¿Desea eliminar este usuario?')

        if(confirmar){
            await eliminarUsuario(usuarioId)
            location.reload()
        }
    }
}

//buscador
const inputBuscar = document.querySelector('#buscar')

inputBuscar.addEventListener('keyup',buscarUsuario)

async function mostrarUsuarios(){
    const usuarios = await obtenerUsuarios()
    let usuariosFiltrados = usuarios

    usuariosFiltrados.forEach((usuario)=>{
        const {pnombre,snombre,papellido,sapellido,cedula,fnacimiento,telefono,email,tipo,id} = usuario
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${pnombre} ${snombre} ${papellido} ${sapellido}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${cedula}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fnacimiento}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${telefono}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${email}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <td class="text-center px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <a class="text-teal-600 font-bold hover:text-teal-900 grid justify-center" href="editar.html?id=${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </a>

                <a class="text-red-600 font-bold hover:text-red-900 eliminar grid justify-center" href="#" data-usuario="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </a>
            </td>
        `
        listado.appendChild(fila)
    })
}

async function buscarUsuario(e){
    const terminoBusqueda = e.target.value.toLowerCase()
    const usuarios = await obtenerUsuarios()
    let usuariosFiltrados = usuarios.filter((usuario)=>{
        const { pnombre,snombre,papellido,sapellido,cedula,fnacimiento,telefono,email,tipo } = usuario
        const usuarioString = `${pnombre}+' '+${snombre}+' '+${papellido}+' '+${sapellido} ${cedula} ${fnacimiento} ${telefono} ${email} ${tipo}`.toLowerCase()
        return usuarioString.includes(terminoBusqueda)
    })

    listado.innerHTML = ''

    usuariosFiltrados.forEach((usuario) => {
        const { pnombre,snombre,papellido,sapellido,cedula,fnacimiento,telefono,email,tipo,id } = usuario
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${pnombre} ${snombre} ${papellido} ${sapellido}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${cedula}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${fnacimiento}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${telefono}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${email}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <td class="text-center px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <a class="text-teal-600 font-bold hover:text-teal-900 grid justify-center" href="editar.html?id=${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </a>

                <a class="text-red-600 font-bold hover:text-red-900 eliminar grid justify-center" href="#" data-usuario="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </a>
            </td>
        `
        listado.appendChild(fila)
    })
}

function exportarPDF() {
    const doc = new jspdf.jsPDF('landscape')

    const fechaActual = new Date()
    const fechaFormateada = fechaActual.toLocaleDateString()
    const horaFormateada = fechaActual.toLocaleTimeString()

    const listado = document.getElementById('listado-Usuarios')
    const filas = listado.querySelectorAll('tr')
    const rows = []
    filas.forEach((fila) => {
        const celdas = fila.querySelectorAll('th')
        const row = [];
        celdas.forEach((celda) => {
            row.push(celda.innerText)
        })
        rows.push(row)
    })

    const totalUsuarios = rows.length

    const columns = ["Nombre", "Cedula", "Fecha de nacimiento", "Telefono", "Correo electronico", "Tipo"]

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        didDrawPage: function (data) {
            doc.text(`Reporte de Usuarios ${fechaFormateada} ${horaFormateada}`, data.settings.margin.left, 10)
        }
    })

    const finalY = doc.autoTable.previous.finalY + 10
    doc.autoTable({
        head: [['Total de Usuarios']],
        body: [[totalUsuarios]],
        startY: finalY,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        tableWidth: 'wrap'
    })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, `Reporte_Usuarios_${fechaFormateada}_${horaFormateada}.pdf`)
}

document.getElementById('exportarPDF').addEventListener('click', exportarPDF)

function exportarExcel() {
    const headers = ["Nombre", "Cedula", "Fecha de nacimiento", "Telefono", "Correo electronico", "Tipo"]
    const listado = document.getElementById('listado-Usuarios');
    const filas = listado.querySelectorAll('tr');
    const rows = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('th')
        const row = []
        celdas.forEach(celda => {
            row.push(celda.innerText)
        });
        rows.push(row)
    });

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Usuarios")

    const fechaActual = new Date()
    const fechaFormateada = fechaActual.toLocaleDateString()
    const horaFormateada = fechaActual.toLocaleTimeString()

    XLSX.writeFile(wb, `Reporte_Usuarios_${fechaFormateada}_${horaFormateada}.xlsx`)
}

document.getElementById('exportarExcel').addEventListener('click', exportarExcel)