const nav = document.querySelector('#navegacion')
const crearNavHome = ()=>{nav.innerHTML = `
    <div class="h-16 mx-auto flex items-center px-4 justify-between">
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-blue-400">
            <path 
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>

        <a href="/dashboard/admin" class="text-neutral-50 font-bold font-mono text-2xl italic">Boss Transport</a>
                
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-400">
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
    </div>
    `
}

const menuLateral = document.querySelector('#menu-lateral')
const crearMenuLat = ()=>{menuLateral.innerHTML = `
    <div class="fixed p-4 self-start w-44 text-lg max-md:hidden border-slate-300/10 border-r-2 bg-gradient-to-br from-cyan-950 to-black/95 min-h-screen">
        <div class="hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out my-4">
            <a href="/dashboard/admin/vehiculos/" class="font-mono font-bold text-white px-1 py-1 uppercase">Vehiculos</a>
        </div>
        <div class="hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out my-4">
            <a href="/dashboard/admin/usuarios/" class="font-mono font-bold text-white px-1 py-1 uppercase">Usuarios</a>
        </div>
        <div class="hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out my-4">
            <a href="/dashboard/admin/rutas/" class="font-mono font-bold text-white px-1 py-1 uppercase">Rutas</a>
        </div>
        <div class="hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out my-4">
            <a href="/dashboard/admin/mantenimiento/" class="font-mono font-bold text-white px-1 py-1 uppercase">Mantenimiento</a>
        </div>         
     </div>
    `
}

const menuModal = document.querySelector('#menu')
const crearMenuModal = ()=>{menuModal.innerHTML = `
    <ul class="fixed top-16 bg-gradient-to-br from-cyan-950 to-black/95 rounded-lg">
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a href="/dashboard/admin/vehiculos/" class="font-mono font-bold text-white px-1 py-1 uppercase">Vehiculos</a></li>
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a href="/dashboard/admin/usuarios/" class="font-mono font-bold text-white px-1 py-1 uppercase">Usuarios</a></li>
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a href="/dashboard/admin/rutas/" class="font-mono font-bold text-white px-1 py-1 uppercase">Rutas</a></li>
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a href="/dashboard/admin/mantenimiento/" class="font-mono font-bold text-white px-1 py-1 uppercase">Mantenimiento</a></li>
    </ul>
    `
}

const menuModal2 = document.querySelector('#menu2')
const crearMenuModal2 = ()=>{menuModal2.innerHTML = `
    <ul class="fixed top-16 bg-gradient-to-br from-cyan-950 to-black/95 rounded-lg">
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a href="/dashboard/admin/password/" class="font-mono font-bold text-white px-1 py-1 uppercase">Contraseña</a></li>
        <li class="my-4 hover:bg-cyan-800 rounded-md transition duration-150 ease-in-out mb-2 mx-4"><a id="salir-btn" href="/login/" class="font-mono font-bold text-white px-1 py-1 uppercase">Salir</a></li>
    </ul>
    `
}

if(window.location.pathname === '/dashboard/admin/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/vehiculos/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/vehiculos/nuevo.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/vehiculos/editar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/usuarios/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/usuarios/nuevo.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/usuarios/editar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/rutas/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/rutas/nuevo.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/rutas/editar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/rutas/ver.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/rutas/finalizar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/mantenimiento/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/mantenimiento/nuevo.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/mantenimiento/ver.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/mantenimiento/editar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/mantenimiento/finalizar.html'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}else if(window.location.pathname === '/dashboard/admin/password/'){
    crearNavHome(),
    crearMenuLat(),
    crearMenuModal(),
    crearMenuModal2()
}

const navBtn = navegacion.children[0].children[0]
//console.log(navBtn)

navBtn.addEventListener('click',e=>{
    //console.log('click')

    const menu = document.querySelector('#menu')
    //console.log(menu)

    if(!navBtn.classList.contains('active')){
        navBtn.classList.add('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menu.classList.remove('hidden')
    }else{
        navBtn.classList.remove('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
        menu.classList.add('hidden')
    }
})

const navBtn2 = navegacion.children[0].children[2]
//console.log(navBtn2)

navBtn2.addEventListener('click',e=>{
    //console.log('click')

    const menu2 = document.querySelector('#menu2')
    //console.log(menu2)

    if(!navBtn2.classList.contains('active')){
        navBtn2.classList.add('active')
        navBtn2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menu2.classList.add('flex')
        menu2.classList.remove('hidden')
    }else{
        navBtn2.classList.remove('active')
        navBtn2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'
        menu2.classList.remove('flex')
        menu2.classList.add('hidden')
    }
})

/*const btnDarkMode = navegacion.children[0].children[2].children[0]
//console.log(btnDarkMode)

btnDarkMode.addEventListener('click',e=>{
    //console.log('click')
    
    if(btnDarkMode.classList.contains('active')){
        btnDarkMode.classList.remove('active')
        btnDarkMode.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />'
    }else{
        btnDarkMode.classList.add('active')
        btnDarkMode.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z">'
    }
})*/

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const userDataCookie = getCookie('userSession')
const decodedCookie = decodeURIComponent(userDataCookie)
const userData = JSON.parse(decodedCookie)
if (!userData){
    window.location.href = '/login'
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

const salirBtn = document.querySelector('#salir-btn')
salirBtn.addEventListener('click', async (e) => {
    deleteCookie('userSession');
    window.location.href = '/login'
})

