
const coches = ['🚗', '🏎️', '🚙', '🚓'];

const pistas = [
    { 
        nombre: 'Asfalto',
        multiplicador: 1, 
        num: 1 
    }, { 
        nombre: 'Tierra', 
        multiplicador: 1.3, 
        num: 2 
    }, { 
        nombre: 'Nieve', 
        multiplicador: 1.5, 
        num: 3 
    }
];

const eventosMeteorologicos = ['lluvia', 'avería', 'sin problemas'];

async function preguntarApuesta() {
    const cocheElegido = parseInt(prompt("Elige un coche para apostar:\n1. 🚗\n2. 🏎️\n3. 🚙\n4. 🚓")) - 1;
    const pistaElegida = parseInt(prompt("Elige una pista:\n1. Asfalto\n2. Tierra\n3. Nieve")) - 1;

    if (cocheElegido < 0 || cocheElegido >= coches.length || pistaElegida < 0 || pistaElegida >= pistas.length) {
        console.log("Selección inválida. Inténtalo de nuevo.");
        return null;
    }

    return { cocheElegido, pistaElegida };
}


// Calcular el tiempo aleatorio que tarda cada copche en hacer la carrera devuelve una promesa que se resuelve cuando el coche finaliza
function simularCoche(coche , multiplicador) {
    return new Promise((resolve) => {
        
        let tiempo = (Math.random() * 4000 + 3000) * multiplicador; // tiempo aleatorio entre 3 y 7 segundos
        console.log(`${coche} ha comenzado la carrera...`);

        const eventoAleatorio = eventosMeteorologicos[Math.floor(Math.random() * eventosMeteorologicos.length)];

        if (eventoAleatorio === 'lluvia') {
            console.log(`🌧️ ${coche} ha sido afectado por la lluvia y ha reducido su velocidad`);
            tiempo *= 1.2; // aumenta el tiempo en un 20%
        } else if (eventoAleatorio === 'avería') {
            console.log(`🔧 ${coche} ha sufrido una avería y se detiene unos segundos`);
            tiempo += 3000; // añade 3 segundos
        }

        setTimeout(() => {
            console.log(` El coche ${coche} ha terminado la carrera en ${(tiempo / 1000).toFixed(2)} segundos.`);
            resolve({ coche, tiempo });
        }, tiempo);
    });
}

async function carrera() {

    const apuesta = await preguntarApuesta();

    if (!apuesta) return;

    const { cocheElegido, pistaElegida } = apuesta;

    const cocheApostado = coches[cocheElegido];
    const pistaSeleccionada = pistas[pistaElegida].nombre;
    const multiplicadorPista = pistas[pistaElegida].multiplicador;

    console.log(`\n La carrera en la pista de ${pistaSeleccionada} ha comenzado ->`);
    console.log(`Has apostado por el coche ${cocheApostado}.\n`);
   
    // Iniciar la carrera para todos los coches
    const promesasCarrera = coches.map((coche) => simularCoche(coche, multiplicadorPista));

    // Determinar el ganador con Promise.race -> gana la primera promesa que se resuelva o rechace
    const ganador = await Promise.race(promesasCarrera);
    console.log(`\n🏆 El ganador es: ${ganador.coche} con un tiempo de ${(ganador.tiempo / 1000).toFixed(2)} segundos!`);

    // Comprobar apuesta
    if (ganador.coche === cocheApostado) {
        console.log(`🎉 ¡Felicidades! Ganaste la apuesta con el coche ${cocheApostado}!`);
    } else {
        console.log(`😢 Lo siento, el coche ${cocheApostado} no ganó`);
    }
        
    // mostrar la clasificación final fcon Promise.all -> se resuelve cuando todas las promesas se resuelven
    const clasificacion = await Promise.all(promesasCarrera);
    console.log(`\n Clasificación Final:`);
    clasificacion
        .sort((a, b) => a.tiempo - b.tiempo) // sort para ordenar arrays
        .forEach((resultado, index) => {
            console.log(`${index + 1}º lugar: ${resultado.coche} - ${(resultado.tiempo / 1000).toFixed(2)} segundos`);
        });
}

carrera();
