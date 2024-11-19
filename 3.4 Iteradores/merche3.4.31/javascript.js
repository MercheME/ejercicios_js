// WeakMap se usa para almacenar pares clave-valor donde las claves son objetos, y las referencias débiles permiten que el recolector de basura elimine las entradas cuando no hay más referencias a las claves

// Creamos un WeakMap para el sistema de caché
const cache = new WeakMap();

// Función para obtener datos de simulación
function obtenerDatos(clave) {
    if (cache.has(clave)) { // Verifica si la clave ya está en la caché
        console.log('Obtenido desde la caché:', cache.get(clave));
        return cache.get(clave);
    } else {
        const datos = { /* datos simulados */ value: Math.random() };
        cache.set(clave, datos); // Si la clave no está en la caché, genera datos simulados, los almacena en la caché y los retorna
        console.log('Datos generados:', datos);
        return datos;
    }
}

// Objetos que servirán como claves
let objeto1 = { id: 1 };
let objeto2 = { id: 2 };

// Obtener datos para estos objetos lo cual genera y almacena los datos en la caché la primera vez
obtenerDatos(objeto1); // Genera y almacena en la caché
obtenerDatos(objeto2); 

// Volver a obtener datos para los mismos objetos (desde la caché)
obtenerDatos(objeto1); // Obtiene desde la caché
obtenerDatos(objeto2); 

// Eliminar las referencias a los objetos
objeto1 = null;
objeto2 = null;

// Forzamos el recolector de basura (para fines demostrativos)
setTimeout(() => {
    console.log('Después de recolectar basura:');
    console.log('¿Tiene objeto1?:', cache.has(objeto1)); // false
    console.log('¿Tiene objeto2?:', cache.has(objeto2)); // false
}, 1000);

//Después de la recolección de basura, se verifica que las entradas en la caché han sido eliminadas
