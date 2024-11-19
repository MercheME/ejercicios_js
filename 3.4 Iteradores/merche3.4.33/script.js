// Creamos un WeakMap para el sistema de caché
const cachePotencias = new WeakMap();

// Generador de potencias con caché
function* generadorPotencias(base) {
    let exponente = 0;
    
    while (true) {
        let resultado;
        // Si el WeakMap contiene el resultado del exponente actual (cachePotencias.has(exponente)), se recupera de la caché y se utiliza yield para devolver el valor almacenado
        if (cachePotencias.has(exponente)) {
            resultado = cachePotencias.get(exponente);
            console.log(`Resultado en caché: ${base}^${exponente} = ${resultado}`);
        } else {
            // Si el valor no está en la caché, se calcula la potencia utilizando Math.pow(base, exponente), se almacena en la caché (cachePotencias.set(exponente, resultado)) y se utiliza yield para devolver el valor calculado
            resultado = Math.pow(base, exponente);
            const cacheEntry = new Object();
            cacheEntry[exponente] = resultado;
            cachePotencias.set(cacheEntry, resultado);
            console.log(`Resultado calculado: ${base}^${exponente} = ${resultado}`);
        }

        yield resultado;
        exponente++; // Incrementar el exponente para la siguiente iteración
    }
}

// Demostración de cómo utilizar el generador de potencias con caché
const base = 2;
const potencias = generadorPotencias(base);

for (let i = 0; i < 10; i++) {
    console.log(potencias.next().value);
}
