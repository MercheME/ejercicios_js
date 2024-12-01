
function crearDescarga(id, tamaño, prioridad) {
    return {
        id: id,
        tamaño: tamaño,
        prioridad: prioridad,
        descargado: 0,
        progreso: 0,
        enPausa: false,
        cancelada: false,
        reintentos: 0,
        maxReintentos: 3,
        intervalo: null,
        simular(progresoCallback, errorCallback) {
            this.intervalo = setInterval(() => {

                if (this.enPausa || this.cancelada) {
                    clearInterval(this.intervalo);
                    return;
                }

                if (Math.random() < 0.1 && this.reintentos < this.maxReintentos) {
                    this.reintentos++;
                    clearInterval(this.intervalo);
                    errorCallback(this);
                    return;
                }

                this.descargado += Math.min(10, this.tamaño - this.descargado); //límite de ancho de banda

                this.progreso = (this.descargado / this.tamaño) * 100;

                if (this.progreso >= 100) {
                    this.progreso = 100;
                    clearInterval(this.intervalo);
                }

                progresoCallback(this);

            }, 1000);
        },
        pausar() { this.enPausa = true; },
        reanudar(progresoCallback, errorCallback) {
            this.enPausa = false;
            this.simular(progresoCallback, errorCallback);
        },
        cancelar() { this.cancelada = true; }
    };
}

const gestorDescargas = {
    maxDescargasSimultaneas: 2,
    descargasActivas: [],
    descargasPendientes: [],
    añadirDescarga(descarga) {
        if (this.descargasActivas.length < this.maxDescargasSimultaneas) {
            this.iniciarDescarga(descarga);

        } else {
            this.descargasPendientes.push(descarga);
            this.descargasPendientes.sort((a, b) => b.prioridad - a.prioridad); // Ordena por prioridad
        }
    },
    iniciarDescarga(descarga) {
        this.descargasActivas.push(descarga);

        descarga.simular(
            (desc) => this.actualizarProgreso(desc),
            (desc) => this.manejarError(desc)
        );
    },
    actualizarProgreso(descarga) {
        console.log(`Descarga ${descarga.id}: ${descarga.progreso.toFixed(2)}%`);

        if (descarga.progreso === 100) {
            this.descargasActivas = this.descargasActivas.filter(d => d.id !== descarga.id);

            if (this.descargasPendientes.length > 0) {
                this.iniciarDescarga(this.descargasPendientes.shift());
            }
        }
    },
    manejarError(descarga) {
        console.log(`Error en la descarga ${descarga.id}, reintento ${descarga.reintentos}/${descarga.maxReintentos}`);

        if (descarga.reintentos < descarga.maxReintentos) {
            descarga.simular(
                (desc) => this.actualizarProgreso(desc),
                (desc) => this.manejarError(desc)
            );
        } else {
            this.descargasActivas = this.descargasActivas.filter(d => d.id !== descarga.id);
            if (this.descargasPendientes.length > 0) {
                this.iniciarDescarga(this.descargasPendientes.shift());
            }
        }
    }
};

const descarga1 = crearDescarga(1, 100, 1);
const descarga2 = crearDescarga(2, 200, 3);
const descarga3 = crearDescarga(3, 150, 2);
const descarga4 = crearDescarga(4, 250, 1);

gestorDescargas.añadirDescarga(descarga1);
gestorDescargas.añadirDescarga(descarga2);
gestorDescargas.añadirDescarga(descarga3);
gestorDescargas.añadirDescarga(descarga4);

// pausar, reanudar y cancelar descargas
setTimeout(() => {
    console.log('Pausando descarga 1...');
    descarga1.pausar();
}, 5000);

setTimeout(() => {
    console.log('Reanudando descarga 1...');
    descarga1.reanudar(
        (desc) => gestorDescargas.actualizarProgreso(desc),
        (desc) => gestorDescargas.manejarError(desc)
    );
}, 10000);

setTimeout(() => {
    console.log('Cancelando descarga 2...');
    descarga2.cancelar();
}, 15000);
