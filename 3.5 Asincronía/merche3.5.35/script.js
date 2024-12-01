
function ruleta() {
    console.log("La ruleta está girando...");

    return new Promise((resolve, reject) => {
        const tiempoDeEspera = Math.floor(Math.random() * 3 + 1) * 1000;

        setTimeout(() => {
            const numero = Math.floor(Math.random() * 11); // numeros entre 0 y 10
            
            if (numero === 0) {
                reject("La ruleta se ha atascado");
            } else {
                resolve(numero);
            }
        }, tiempoDeEspera);
    });
}

function calcularPuntos(numero) {
    return numero * 10; 
}

ruleta()
    .then(numero => {
        console.log(`🏆¡El número ganador es ${numero}!`);
        const puntos = calcularPuntos(numero);
        console.log(`Has ganado ${puntos} puntos`);
    })
    .catch(error => {
        console.log(error);
    });
