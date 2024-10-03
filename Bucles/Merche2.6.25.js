
function juegoCombate() {

    // variables del juego
    let vidaJugadora = 100;
    let vidaMonstruo = 150;
    let cantidadPociones = 3;
    let ataqueMaxJugadora = 25;
    let ataqueMaxMonstruo = 20;
    let curacionMaxPocion = 30;

    function getRandomInt( min, max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

   
    while (vidaJugadora > 0  && vidaMonstruo > 0) {

         // turno jugador
        let accion = prompt(`                       
                        ⚔️ JUEGO DE COMBATE ⚔️ \n
                     ¡Es tu turno!, ¿Qué deseas hacer? \n
                            1. ATACAR MONSTRUO \n
                            2. TOMAR POCION   \n
                            3. BUSCAR POCIÓN  \n
                            4. SALIR `);

        if ( accion === '1' ) { //atarc monstruo

            let ataqueJugadora = getRandomInt(1, ataqueMaxJugadora);
            vidaMonstruo -= ataqueJugadora;

            console.log(`🧙🏼‍♂️💥 Atacaste al monstruo!
                         🗡️ Daño al monstruo: ${ ataqueJugadora } \n
                         🧌 Vida del Mosntruo: ${ vidaMonstruo }`);

        } else if ( accion === '2' ) {

            if ( cantidadPociones > 0 ) {
                let curacion = getRandomInt(1, curacionMaxPocion);
                vidaJugadora += curacion;
                cantidadPociones-- ;

                console.log(`🍺 Tomaste una poción \n
                            💕 Recuperaste: ${ curacion } de vida \n
                            🧙🏼‍♂️ Vida del jugador: ${ vidaJugadora } \n
                            🍻 Pociones actuales: ${ cantidadPociones } `);

            } else {
                
                console.log(`✖️ No te quedan más pociones \n
                            🧙🏼‍♂️ Vida del jugador: ${ vidaJugadora } `);

            }

        } else if ( accion === '3' ) {

            let buscar = getRandomInt(1, 4);
            if (buscar === 1) {
                cantidadPociones++;

                console.log(`🍺 Encontraste una poción! \n
                             🍻 Pociones actuales: ${ cantidadPociones }`);

            } else {

                console.log("✖️ No encontraste la poción");
            }

        } else if (accion === '4' ) { // salir
            console.log(" 💨 Decidiste salir del combate");
            break;
        } else {
            console.log("❌ Opción inválida. Inténtalo de nuevo");
        }

        // turno monstruo
        if (vidaMonstruo > 0) {
            let danioMonstruo = getRandomInt(1, ataqueMaxMonstruo);
            vidaJugadora -= danioMonstruo;
            console.log(`🧌💥 El monstruo te atacó! \n
                        🩸 Daño recibido: ${danioMonstruo} \n
                        🧙🏼‍♂️ Vida del jugador: ${vidaJugadora}`);
        }


        if (vidaJugadora <= 0) {

            console.log("💀 ¡El monstruo te ha derrotado! Fin del juego 💀 ");

        } else if (vidaMonstruo <= 0) {

            console.log("🏆 ¡Has derrotado al monstruo! ¡Victoria! 🏆");
        }

    }

 
    
}


juegoCombate();