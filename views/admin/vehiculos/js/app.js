const obtenerVehiculos = async ()=>{
    try{
        const response = await axios.get('/api/vehiculos')
        const vehiculos = await response.data
        return vehiculos
    }catch(error){
        console.log(error)
    }
}

const eliminarVehiculo = async id =>{
    try{
        const response = axios.delete(`/api/vehiculos/${id}`)
    }catch(error){
        console.log(error)
    }
}

const listado = document.querySelector('#listado-Vehiculos')

document.addEventListener('DOMContentLoaded',mostrarVehiculos)
listado.addEventListener('click',confirmarEliminar)

async function mostrarVehiculos(){
    const vehiculos = await obtenerVehiculos()
    console.log(vehiculos)

    vehiculos.forEach((vehiculo)=>{
        const {marca,modelo,año,placa,tipo,km,estado,ubicacion,id} = vehiculo
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${marca}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${modelo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${año}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${placa}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${km}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estado}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${ubicacion}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="grid grid-cols-2">
                    <div>
                        <a id="crear-ruta" class="text-white font-bold hover:text-gray-400 grid justify-center" href="/dashboard/admin/rutas/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </a>
                        <a id="mantenimiento" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="/dashboard/admin/mantenimiento/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <a id="editar" class="text-teal-600 font-bold hover:text-teal-900 grid justify-center" href="editar.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </a>
                        <a id="eliminar" class="text-red-600 font-bold hover:text-red-900 eliminar grid justify-center" href="#" data-vehiculo="${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </a>
                    </div>
                </div>
            </td>
        `
        listado.appendChild(fila)

        const btnRuta = fila.querySelectorAll('#crear-ruta');
        btnRuta.forEach(boton => {
            if (estado !== 'Disponible' && estado !== 'Ocupado') {
                boton.classList.remove('text-white', 'hover:text-gray-400');
                boton.classList.add('text-gray-600', 'cursor-not-allowed');
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnMantenimiento = fila.querySelectorAll('#mantenimiento')
        btnMantenimiento.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-orange-600', 'hover:text-orange-900')
                boton.classList.add('text-orange-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEditar = fila.querySelectorAll('#editar')
        btnEditar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-teal-600', 'hover:text-teal-900')
                boton.classList.add('text-teal-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEliminar = fila.querySelectorAll('#eliminar')
        btnEliminar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-red-600', 'hover:text-red-900', 'eliminar')
                boton.classList.add('text-red-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })
    })
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const vehiculoId = (e.target.dataset.vehiculo)
        //console.log(vehiculoId)

        const confirmar = confirm('¿Desea eliminar este vehiculo?')

        if(confirmar){
            await eliminarVehiculo(vehiculoId)
            location.reload()
        }
    }
}

//buscador
const inputBuscar = document.querySelector('#buscar')

inputBuscar.addEventListener('keyup',buscarVehiculo)

async function mostrarVehiculos(){
    const vehiculos = await obtenerVehiculos()
    let vehiculosFiltrados = vehiculos

    vehiculosFiltrados.forEach((vehiculo)=>{
        const {marca, modelo, año, placa, tipo, km, estado, ubicacion, id} = vehiculo
        const fila = document.createElement('tr')
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${marca}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${modelo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${año}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${placa}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${km}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estado}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${ubicacion}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="grid grid-cols-2">
                    <div>
                        <a id="crear-ruta" class="text-white font-bold hover:text-gray-400 grid justify-center" href="/dashboard/admin/rutas/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </a>
                        <a id="mantenimiento" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="/dashboard/admin/mantenimiento/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <a id="editar" class="text-teal-600 font-bold hover:text-teal-900 grid justify-center" href="editar.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </a>
                        <a id="eliminar" class="text-red-600 font-bold hover:text-red-900 eliminar grid justify-center" href="#" data-vehiculo="${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </a>
                    </div>
                </div>
            </td>
        `
        listado.appendChild(fila)

        const btnRuta = fila.querySelectorAll('#crear-ruta');
        btnRuta.forEach(boton => {
            if (estado !== 'Disponible' && estado !== 'Ocupado') {
                boton.classList.remove('text-white', 'hover:text-gray-400');
                boton.classList.add('text-gray-600', 'cursor-not-allowed');
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnMantenimiento = fila.querySelectorAll('#mantenimiento')
        btnMantenimiento.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-orange-600', 'hover:text-orange-900')
                boton.classList.add('text-orange-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEditar = fila.querySelectorAll('#editar')
        btnEditar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-teal-600', 'hover:text-teal-900')
                boton.classList.add('text-teal-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEliminar = fila.querySelectorAll('#eliminar')
        btnEliminar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-red-600', 'hover:text-red-900', 'eliminar')
                boton.classList.add('text-red-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })
    })
}

async function buscarVehiculo(e){
    const terminoBusqueda = e.target.value.toLowerCase()
    const vehiculos = await obtenerVehiculos()
    let vehiculosFiltrados = vehiculos.filter((vehiculo)=>{
        const { marca, modelo, año, placa, tipo, estado, ubicacion } = vehiculo
        const vehiculoString = `${marca} ${modelo} ${año} ${placa} ${tipo} ${estado} ${ubicacion}`.toLowerCase();
        return vehiculoString.includes(terminoBusqueda);
    })

    listado.innerHTML = ''

    vehiculosFiltrados.forEach((vehiculo) => {
        const { marca, modelo, año, placa, tipo, km, estado, ubicacion, id } = vehiculo;
        const fila = document.createElement('tr');
        fila.innerHTML +=`
            <th class="text-center px-3 py-3 border-b border-gray-200 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${marca}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${modelo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${año}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${placa}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${tipo}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${km}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${estado}</p>
            </th>

            <th class="px-3 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                <p>${ubicacion}</p>
            </th>

            <td class="px-3 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="grid grid-cols-2">
                    <div>
                        <a id="crear-ruta" class="text-white font-bold hover:text-gray-400 grid justify-center" href="/dashboard/admin/rutas/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </a>
                        <a id="mantenimiento" class="text-orange-600 font-bold hover:text-orange-900 mantenimiento grid justify-center" href="/dashboard/admin/mantenimiento/nuevo.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <a id="editar" class="text-teal-600 font-bold hover:text-teal-900 grid justify-center" href="editar.html?id=${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mb-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </a>
                        <a id="eliminar" class="text-red-600 font-bold hover:text-red-900 eliminar grid justify-center" href="#" data-vehiculo="${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </a>
                    </div>
                </div>
            </td>
        `
        listado.appendChild(fila)
        
        const btnRuta = fila.querySelectorAll('#crear-ruta');
        btnRuta.forEach(boton => {
            if (estado !== 'Disponible' && estado !== 'Ocupado') {
                boton.classList.remove('text-white', 'hover:text-gray-400');
                boton.classList.add('text-gray-600', 'cursor-not-allowed');
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnMantenimiento = fila.querySelectorAll('#mantenimiento')
        btnMantenimiento.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-orange-600', 'hover:text-orange-900')
                boton.classList.add('text-orange-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEditar = fila.querySelectorAll('#editar')
        btnEditar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-teal-600', 'hover:text-teal-900')
                boton.classList.add('text-teal-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })

        const btnEliminar = fila.querySelectorAll('#eliminar')
        btnEliminar.forEach(boton => {
            if (estado === 'En mantenimiento' || estado === 'En ruta' || estado === 'Ocupado'){
                boton.classList.remove('text-red-600', 'hover:text-red-900', 'eliminar')
                boton.classList.add('text-red-900', 'cursor-not-allowed')
                boton.addEventListener('click', (e) => {
                    e.preventDefault()
                })
            }
        })
    })
}

function exportarPDF() {
    const doc = new jspdf.jsPDF('landscape')

    const fechaActual = new Date()
    const fechaFormateada = fechaActual.toLocaleDateString()
    const horaFormateada = fechaActual.toLocaleTimeString()

    const listado = document.getElementById('listado-Vehiculos')
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

    const totalVehiculos = rows.length

    const columns = ["Marca", "Modelo", "Año", "Placa", "Tipo", "KM", "Estado", "Ubicación"]

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        didDrawPage: function (data) {
            doc.text(`Reporte de Vehículos ${fechaFormateada} ${horaFormateada}`, data.settings.margin.left, 10)
        }
    })

    const finalY = doc.autoTable.previous.finalY + 10;
    doc.autoTable({
        head: [['Total de Vehículos']],
        body: [[totalVehiculos]],
        startY: finalY,
        theme: 'grid',
        styles: { fontSize: 8, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133] },
        margin: { top: 10, bottom: 10, left: 10, right: 10 },
        tableWidth: 'wrap'
    })

    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, `Reporte_Vehículos_${fechaFormateada}_${horaFormateada}.pdf`)
}
document.getElementById('exportarPDF').addEventListener('click', exportarPDF)

function exportarExcel() {
    const headers = ["Marca", "Modelo", "Año", "Placa", "Tipo", "KM", "Combustible", "Estado"];
    const listado = document.getElementById('listado-Vehiculos');
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
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Vehículos");

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString();
    const horaFormateada = fechaActual.toLocaleTimeString();

    XLSX.writeFile(wb, `Reporte_Vehiculos_${fechaFormateada}_${horaFormateada}.xlsx`);
}
document.getElementById('exportarExcel').addEventListener('click', exportarExcel)