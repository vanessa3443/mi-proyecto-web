// 1. SIMULACIÓN DE LA BASE DE DATOS DE LA ONU (JSON)
// En un proyecto real, esto vendría de una API con fetch()
const database = {
    "mexico": {
        name: "México",
        population: "126.7 Millones",
        lifeExpectancy: "75.1 Años",
        poverty: "36.3%",
        // Datos simulados de los ODS (0 a 100)
        odsData: [85, 60, 75, 90, 65, 70] 
    },
    "brasil": {
        name: "Brasil",
        population: "214.3 Millones",
        lifeExpectancy: "75.9 Años",
        poverty: "24.1%",
        odsData: [78, 55, 68, 85, 70, 60]
    },
    "sudafrica": {
        name: "Sudáfrica",
        population: "59.3 Millones",
        lifeExpectancy: "64.1 Años",
        poverty: "55.5%",
        odsData: [65, 45, 50, 60, 55, 40]
    }
};

// Variables globales para el gráfico
let myChart = null;
const ctx = document.getElementById('odsChart').getContext('2d');

// 2. FUNCIÓN PARA INICIALIZAR EL SELECTOR
function initSelector() {
    const selector = document.getElementById('country-selector');
    
    // Llenamos el select con los datos de la "base de datos"
    for (const key in database) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = database[key].name;
        selector.appendChild(option);
    }

    // Escuchamos el evento de cambio (comunicación de datos)
    selector.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });
}

// 3. FUNCIÓN PARA ACTUALIZAR LA INTERFAZ Y EL GRÁFICO
function updateDashboard(countryKey) {
    const data = database[countryKey];
    
    // Mostrar el dashboard si estaba oculto
    document.getElementById('dashboard').classList.remove('hidden');

    // Actualizar las tarjetas de estadísticas (Manipulación del DOM)
    document.getElementById('stat-population').textContent = data.population;
    document.getElementById('stat-life').textContent = data.lifeExpectancy;
    document.getElementById('stat-poverty').textContent = data.poverty;

    // Actualizar el Gráfico
    renderChart(data.odsData, data.name);
}

// 4. FUNCIÓN PARA RENDERIZAR EL GRÁFICO CON CHART.JS
function renderChart(odsValues, countryName) {
    // Si ya existe un gráfico, lo destruimos para crear uno nuevo
    if (myChart) {
        myChart.destroy();
    }

    // Creamos el nuevo gráfico
    myChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barras)
        data: {
            labels: ['Fin Pobreza', 'Hambre Cero', 'Salud', 'Educación', 'Igualdad', 'Agua Limpia'],
            datasets: [{
                label:` Progreso ODS en ${countryName} (%)`,
                data: odsValues , 
                backgroundColor: [
                    'rgba(0, 158, 219, 0.8)', // Azul ONU
                    'rgba(0, 158, 219, 0.6)',
                    'rgba(0, 158, 219, 0.4)',
                    'rgba(0, 158, 219, 0.7)',
                    'rgba(0, 158, 219, 0.5)',
                    'rgba(0, 158, 219, 0.9)'
                ],
                borderColor: '#009edb',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#333' }, // Líneas de fondo oscuras
                    ticks: { color: '#aaa' } // Texto gris
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#aaa' }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// 5. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    initSelector();
});