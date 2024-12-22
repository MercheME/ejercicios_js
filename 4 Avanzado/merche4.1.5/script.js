
const apiKey = '71028b9918aba8b947c24020159b9fb2';

// obtener el clima de la ciudad
function getWeather(ciudad) {
    const apyUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${ciudad}`;

    fetch(apyUrl)
        .then(response => response.json())
        .then(data => mostrarTiempo(data))
        .catch(error => alert('Error al obtener el clima desde la API: ' + error));
}

function mostrarTiempo(data) {
    const weatherResult = document.getElementById('weatherResult');

    weatherResult.innerHTML = `
        <h3>Clima de ${data.name}</h3>
        <p>Temperatura: ${data.main.temp} °C</p>
        <p>Condición: ${data.weather[0].description}</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Viento: ${data.wind.speed} m/s</p>
        <button onclick="guardarLocalidad('${data.name}')">Guardar Ubicación</button>
    `;
}

// Para guardar la ubicación en el localStorage
function guardarLocalidad(ciudad) {
    let guardarLocalidades = JSON.parse(localStorage.getItem('savedLocations')) || [];

    // validacion para asegurar que es un array
    if (!Array.isArray(guardarLocalidades)) {
        guardarLocalidades = [];
    }

    if (!guardarLocalidades.includes(ciudad)) {

        guardarLocalidades.push(ciudad);

        localStorage.setItem('savedLocations', JSON.stringify(guardarLocalidades));

        mostrarUbicacionesGuardadas();
    } else {
        alert('La ciudad ya está guardada.');
    }
}

function mostrarUbicacionesGuardadas() {
    const localidadesLista = document.getElementById('locationList');

    localidadesLista.innerHTML = '';

    let guardarLocalidades = JSON.parse(localStorage.getItem('savedLocations')) || [];

    // si no es un array, iniciarlo como vacío
    if (!Array.isArray(guardarLocalidades)) {
        guardarLocalidades = [];
    }

    guardarLocalidades.forEach(ciudad => {
        const li = document.createElement('li');

        li.classList.add('location-item');

        li.innerHTML = `
            <span>${ciudad}</span>
            <button onclick="getWeather('${ciudad}')">Ver Clima</button>
            <button onclick="removeLocation('${ciudad}')">Eliminar</button>
        `;
        localidadesLista.appendChild(li);
    });
}

function removeLocation(ciudad) {
    let guardarLocalidades = JSON.parse(localStorage.getItem('savedLocations')) || [];

    if (!Array.isArray(guardarLocalidades)) {
        guardarLocalidades = [];
    }

    // Filtrar la ciudad que se quiere eliminar
    guardarLocalidades = guardarLocalidades.filter(location => location !== ciudad);

    localStorage.setItem('savedLocations', JSON.stringify(guardarLocalidades));

    mostrarUbicacionesGuardadas();
}

document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ciudadInput = document.getElementById('cityInput');
    const ciudad = ciudadInput.value.trim();

    if (ciudad) {
        getWeather(ciudad);
    }
});

// Cargar las ubicaciones guardadas al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarUbicacionesGuardadas();
});
