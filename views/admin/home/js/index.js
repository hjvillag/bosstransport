async function obtenerDatosVehiculos() {
    const response = await axios.get('/api/vehiculos')
    const vehiculos = await response.data
    return vehiculos
}

function processDataByEstado(vehiculos) {
    const estados = {}
    vehiculos.forEach(vehicle => {
        const key = `${vehicle.estado}`
        if (!estados[key]) {
            estados[key] = 0
        }
        estados[key]++
    })
    return estados
}

function processDataByUbicacion(vehiculos) {
    const ubicaciones = {}
    vehiculos.forEach(vehicle => {
        const key = `${vehicle.ubicacion}`
        if (!ubicaciones[key]) {
            ubicaciones[key] = 0
        }
        ubicaciones[key]++
    })
    return ubicaciones
}

function processDataByTipo(vehiculos) {
    const tipos = {}
    vehiculos.forEach(vehicle => {
        const key = `${vehicle.tipo}`
        if (!tipos[key]) {
            tipos[key] = 0
        }
        tipos[key]++
    })
    return tipos
}

function processDataByAño(vehiculos) {
    const años = {}
    vehiculos.forEach(vehicle => {
        const key = `${vehicle.año}`
        if (!años[key]) {
            años[key] = 0
        }
        años[key]++
    })
    return años
}

async function createChartByEstado() {
    const data = await obtenerDatosVehiculos()
    const processedData = processDataByEstado(data)

    const labels = Object.keys(processedData)
    const values = Object.values(processedData)

    const ctx = document.getElementById('grafico-1').getContext('2d')
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'Vehículos por Estado',
                    color: 'white'
                }
            }
        }
    })
}

async function createChartByUbicacion() {
    const data = await obtenerDatosVehiculos();
    const processedData = processDataByUbicacion(data);

    const labels = Object.keys(processedData);
    const values = Object.values(processedData);

    const ctx = document.getElementById('grafico-2').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'none'
                },
                title: {
                    display: true,
                    text: 'Vehículos por Ubicación',
                    color: 'white'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    })
}

async function createChartByTipo() {
    const data = await obtenerDatosVehiculos();
    const processedData = processDataByTipo(data);

    const labels = Object.keys(processedData);
    const values = Object.values(processedData);

    const ctx = document.getElementById('grafico-3').getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'Vehículos por Tipo',
                    color: 'white',
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: 'white'
                    },
                    angleLines: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white'
                    }
                }
            }
        }
    })
}

async function createChartByAño() {
    const data = await obtenerDatosVehiculos()
    const processedData = processDataByAño(data)

    const labels = Object.keys(processedData)
    const values = Object.values(processedData)

    const ctx = document.getElementById('grafico-4').getContext('2d')
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'Vehículos por Estado',
                    color: 'white'
                }
            }
        }
    })
}

createChartByEstado()
createChartByUbicacion()
createChartByTipo()
createChartByAño()