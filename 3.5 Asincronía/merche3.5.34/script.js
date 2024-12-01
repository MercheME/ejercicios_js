
// function temporizador() {
//     console.log('Inicio del programa');
//     segundos = 2000;
//     setTimeout(() => {
//         console.log('Han pasado 2 segundos..');
//         console.log('Fin del programa');
//     }, segundos);
// }

// temporizador();
//los mensajes apareceran en el orden esperado, antes de el setTimeOut aparecerá el mensaje de inicio, una vez pasados dos segundos, aparecerá el resto de informacion que queremos mostrar

function temporizador() {
    let i = 0;
    console.log('Inicio del programa ...');

    function mostrarContador( i ) {
        if (i <= 5) {
            if (i === 0) {
                console.log('Comienza el tiempo:');
            } else {
                console.log(i);
            }
            setTimeout(() => mostrarContador(i + 1), 1000);            
        } else {
            console.log('Han pasado 5 segundos');
            console.log('Fin del programa');
        }
    }
    mostrarContador(i);
}

temporizador();