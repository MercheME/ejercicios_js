function* generadorFibonacci() { // Define una función generadora
    let [a, b] = [0, 1]; // Asigna los valores iniciales de la secuencia de Fibonacci a a y b ([0, 1])
    while (true) {
        yield a; // Produce el valor actual de a y pausa la ejecución de la función generadora
        [a, b] = [b, a + b]; // actualiza los valores de a y b a los siguientes en la secuencia de Fibonacci ([b, a + b])
    }
}

// Usando el iterador
const fibonacci = generadorFibonacci(); 

// obtener los primeros 10 valores de la secuencia de Fibonacci llamando a fibonacci.next().value
for (let i = 0; i < 10; i++) {
    console.log(fibonacci.next().value);
}
