const restaurante = {
    mesas: [1, 2, 3, 4, 5],
    reservas: [],
    esperas: [],
    cache: {},

    verificarDisponibilidad(mesa, horario) {
        return new Promise((resolver, rechazar) => {
            const ocupada = this.reservas.find(reserva => reserva.mesa === mesa && reserva.horario === horario);

            ocupada ? rechazar('Mesa ocupada') : resolver('Mesa disponible');
        });
    },

    hacerReserva(mesa, horario, cliente) {
        return new Promise((resolver, rechazar) => {
            Promise.race([this.verificarDisponibilidad(mesa, horario)])
                .then(() => {
                    this.reservas.push({ mesa, horario, cliente });
                    this.actualizarCache(mesa);

                    resolver('Reserva confirmada');
                    this.notificar(cliente, 'Su reserva ha sido confirmada');
                })
                .catch(() => {
                    this.esperas.push({ mesa, horario, cliente });

                    rechazar('Añadido a la lista de espera');
                    this.notificar(cliente, 'Añadido a la lista de espera');
                });
        });
    },

    actualizarCache(mesa) {
        if (!this.cache[mesa]) this.cache[mesa] = 0;
        this.cache[mesa]++;
    },

    manejarListaEspera() {
        setInterval(() => {
            this.esperas.forEach((espera, index) => {
                this.verificarDisponibilidad(espera.mesa, espera.horario)
                    .then(() => {
                        this.reservas.push(espera);
                        this.esperas.splice(index, 1);
                        this.actualizarCache(espera.mesa);
                    })
                    .catch(() => {});
            });
        }, 5000);
    },

    mostrarEstado() {
        const estado = this.mesas.map((mesa, index) => {
            const reservada = this.reservas.find(reserva => reserva.mesa === mesa);
            return `Mesa ${index + 1}: ${reservada ? "Reservada" : "Disponible"}`;
        });
        console.log(estado.join('\n'));
    },

    simularReservas() {
        const usuarios = [
            { cliente: 'Gabi', mesa: 0, horario: '20:00' },
            { cliente: 'Adri', mesa: 1, horario: '20:00' },
            { cliente: 'Javier', mesa: 2, horario: '20:00' },
            { cliente: 'Maria', mesa: 3, horario: '20:00' },
            { cliente: 'Ismael', mesa: 4, horario: '20:00' },
            
        ];

        usuarios.forEach(({ cliente, mesa, horario }) => {
            this.hacerReserva(mesa, horario, cliente)
                .then(msg => console.log(`${cliente}: ${msg}`))
                .catch(err => console.log(`${cliente}: ${err}`));
        });
    },

    notificar(cliente, mensaje) {
        return new Promise((resolver) => {
            setTimeout(() => {
                console.log(`Notificación para ${cliente}: ${mensaje}`);
                resolver();
            }, 1000);
        });
    }
};

restaurante.simularReservas();
setTimeout(() => restaurante.mostrarEstado(), 1000);
restaurante.manejarListaEspera();
