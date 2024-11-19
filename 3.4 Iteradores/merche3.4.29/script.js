
// Creamos un objeto con un iterador personalizado que genera números pares
const generadorDePares = {
    [Symbol.iterator]() { // Mediante esta propiedad implementa el propocolo de iteracion
        let numeroActual = 0; 
        return {

            // Cada vez que se llama a next(), incrementamos numeroActual en 2 y retornamos un objeto con value (el número par generado) y done (establecido en false para indicar que la iteración no ha terminado)
            next() {
                numeroActual += 2; // Generamos el siguiente número par
                return { value: numeroActual, done: false };
            }
        };
    }
};

// Usando el iterador
for (let numeroPar of generadorDePares) {
    console.log(numeroPar);
    if (numeroPar >= 20) break; // Se detiene cuando llega a 20
}
