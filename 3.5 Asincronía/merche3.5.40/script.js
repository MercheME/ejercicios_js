

function crearCache(tiempoExpiracion = 60000, maxReintentos = 3) {
    const cache = {};
    let aciertos = 0;
    let fallos = 0;

    function obtener(clave) {
        const entrada = cache[clave];

        if (entrada && (Date.now() - entrada.timestamp < tiempoExpiracion)) {
            aciertos++;
            return entrada.valor;
        }

        fallos++;

        delete cache[clave];
        return null;
    }

    function establecer(clave, valor) {
        cache[clave] = { valor, timestamp: Date.now() };
    }

    function limpiar() {
        const ahora = Date.now();

        for (const clave in cache) {
            if (ahora - cache[clave].timestamp >= tiempoExpiracion) {
                delete cache[clave];
            }
        }
    }

    async function dormir(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function obtenerConReintentos(clave, funcionFetch, reintentos = 0) {
        const valorCacheado = obtener(clave);

        if (valorCacheado) return valorCacheado;

        try {
            const valor = await funcionFetch();
            establecer(clave, valor);

            return valor;
        } catch (error) {
            if (reintentos < maxReintentos) {
                
                const delay = Math.pow(2, reintentos) * 1000; // calcula el tiempo de espera en cada reintento, duplicando el tiempo cada vez
                await dormir(delay); // esperar un tiempo antes de reintentar

                return obtenerConReintentos(clave, funcionFetch, reintentos + 1);
            } else {
                throw error;
            }
        }
    }

    function obtenerEstadisticas() {
        return { aciertos, fallos };
    }

    setInterval(limpiar, tiempoExpiracion);

    return {
        obtener,
        establecer,
        obtenerConReintentos,
        obtenerEstadisticas
    };
}

const cache = crearCache();

async function fetchDatos() {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            Math.random() < 0.8 ? resolver('datos') : rechazar('error');
        }, 2000);
    });
}

(async () => {
    try {
        const datos = await cache.obtenerConReintentos('clave1', fetchDatos);
        console.log('Datos:', datos);
    } catch (error) {
        console.log('Error:', error);
    }

    setTimeout(() => {
        const stats = cache.obtenerEstadisticas();

        console.log('Estadísticas:', stats);

    }, 10000);
})();
