// obtener el valor de una cookie por su nombre
function getCookie( name ) {

    // document.cookie devuelve todas las cookies del documento actual en una cadena de texto. Esta cadena tiene el formato: "cookie1=value1; cookie2=value2; cookie3=value3; ..."
    let cookies = document.cookie;

    let cookiesArray = cookies.split(';');  // Separa las cookies en un array

    for (let i = 0; i < cookiesArray.length; i++) {
        // Limpiar espacios al inicio de la cookie
        let cookie = cookiesArray[i].trim();

        // Separar la cookie en nombre y valor
        let [cookieName, cookieValue] = cookie.split('=');

        // Si el nombre de la cookie coincide con el que buscamos, devolvemos el valor
        if (cookieName === name) {
            return cookieValue;
        }
    }

    // si no encontramos la cookie, devuelve null
    return null;
}

// Crear una cookie
function setCookie( name, value, days ) {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiración en días

    //date.toUTCString() convierte la fecha en un formato de cadena de texto en hora universal coordinada (UTC).
    // La cadena de expiración formato: expires=Mon, 18 Dec 2024 12:00:00 GMT
    let expires = `expires=${date.toUTCString()}`;

    // creando la cookie con el nombre, valor, fecha de expiración y ruta
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Contar las visitas
function countVisits() {
    let totalVisits = getCookie('totalVisits');
    let uniqueVisits = getCookie('uniqueVisits');
    let firstVisitDate = getCookie('firstVisitDate');
    let lastVisitDate = getCookie('lastVisitDate');

    // Si es la primera vez que visita el sitio, establecer los valores iniciales
    if (!totalVisits) {
        totalVisits = 1;
        setCookie('totalVisits', totalVisits, 365);  // guardar totalVisits por 365 días
        firstVisitDate = new Date().toLocaleString(); // fecha de la primera visita
        setCookie('firstVisitDate', firstVisitDate, 365);
        setCookie('lastVisitDate', firstVisitDate, 365); // la primera visita es también la última
    } else {
        totalVisits = parseInt(totalVisits) + 1;
        setCookie('totalVisits', totalVisits, 365);
        lastVisitDate = new Date().toLocaleString();
        setCookie('lastVisitDate', lastVisitDate, 365); // actualizo la última visita
    }

    if (!uniqueVisits) {
        uniqueVisits = 1;
        setCookie('uniqueVisits', uniqueVisits, 365);
    } else {
        uniqueVisits = parseInt(uniqueVisits);
    }

    document.getElementById('totalVisits').textContent = totalVisits;
    document.getElementById('firstVisitDate').textContent = firstVisitDate;
    document.getElementById('lastVisitDate').textContent = lastVisitDate;
    document.getElementById('uniqueVisits').textContent = uniqueVisits;
}

// Funciónn reset visitas
function resetVisits() {
    setCookie('totalVisits', 0, 365);
    setCookie('uniqueVisits', 0, 365);
    setCookie('firstVisitDate', '', 365);
    setCookie('lastVisitDate', '', 365);
    
    // volver a cargar la página con los valores actualizados
    location.reload();
}

// Cuando se craga la página, contamos las visitas y mostramos el estado
window.onload = function() {
    countVisits();
};
