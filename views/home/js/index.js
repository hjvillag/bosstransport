document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-in')
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
            }
        });
    }, options)
    sections.forEach(section => {
        observer.observe(section)
    })

    document.querySelectorAll('#seccion').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()
            const targetId = this.getAttribute('href').substring(1)
            const targetSection = document.getElementById(targetId)
            targetSection.scrollIntoView({ behavior: 'smooth' })
        })
    })
})

const menuModal = document.querySelector('#menu-modal')
const crearMenuModal = ()=>{menuModal.innerHTML = `
    <div class="flex flex-col gap-4 bg-gradient-to-br from-cyan-950 to-black rounded-lg">
        <a id="seccion" href="#features" class="text-white font-bold py-2 px-4 hover:bg-cyan-800 rounded-lg transition ease-in-out">Funcionalidades</a>
        <a id="seccion" href="#about" class="text-white font-bold py-2 px-4 hover:bg-cyan-800 rounded-lg transition ease-in-out">Nosotros</a>
        <a id="seccion" href="#contact" class="text-white font-bold py-2 px-4 hover:bg-cyan-800 rounded-lg transition ease-in-out">Contacto</a>
        <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-cyan-800 rounded-lg transition ease-in-out">Login</a>
    </div>
    `
}

if(window.location.pathname === '/'){
    crearMenuModal()
}

const navBtn = navegacion.children[0].children[2]
//console.log(navBtn2)

navBtn.addEventListener('click',e=>{
    //console.log('click')

    const menu = document.querySelector('#menu-modal')
    //console.log(menu)

    if(!navBtn.classList.contains('active')){
        navBtn.classList.add('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menu.classList.add('flex')
        menu.classList.remove('hidden')
    }else{
        navBtn.classList.remove('active')
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'
        menu.classList.remove('flex')
        menu.classList.add('hidden')
    }
})

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#user-message')
const btnSubmit = document.querySelector('#form-btn')

const nombreVal = /^[A-Z][a-zA-Z]*( [a-zA-Z]+)?$/
const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mensajeVal = /^(?!\s*$).+/

let valnombre = false
let valemail = false
let valmensaje = false

nameInput.addEventListener('input',e=>{
    valnombre = nombreVal.test(e.target.value)
    validate(nameInput,valnombre)
})

emailInput.addEventListener('input',e=>{
    valemail = emailVal.test(e.target.value)
    validate(emailInput,valemail)
})

messageInput.addEventListener('input',e=>{
    valmensaje = mensajeVal.test(e.target.value)
    validate(messageInput,valmensaje)
})

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault()

    // Verifica que los campos no estén vacíos
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        mostrarAlerta('Todos los campos son obligatorios')
        return false
    }

    if(valnombre && valemail && valmensaje){
        const templateParams = {
            user_name: nameInput.value,
            user_email: emailInput.value,
            user_message: messageInput.value
        };
    
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(templateParams)
        })
        .then(response => response.text())
        .then(data => {
            mostrarConfirmacion(data)
    
            document.getElementById('contact-form').reset()
        })
        .catch(error => {
            mostrarAlerta(data)
        })
    }else{
        mostrarAlerta('Todos los campos son obligatorios')
    }
})

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    
    if(!alerta){
        const alert = document.createElement('p')
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','text-center')
        alert.innerHTML = mensaje
        document.querySelector('#contact-form').appendChild(alert)

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
        document.querySelector('#contact-form').appendChild(confirmar)

        setTimeout(()=>{
            confirmar.remove()
        },3000)
    }
}

const validate = (input, val) => {
    btnSubmit.disabled = !(valnombre && valemail && valmensaje)
    if(btnSubmit.disabled) {
        btnSubmit.classList.remove('hover:bg-gray-600','bg-slate-950','border-gray-400')
        btnSubmit.classList.add('bg-gray-700','cursor-not-allowed','border-gray-400')
    }else{
        btnSubmit.classList.remove('bg-gray-700','cursor-not-allowed','border-gray-400')
        btnSubmit.classList.add('hover:bg-gray-600','bg-slate-950','border-blue-400')
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