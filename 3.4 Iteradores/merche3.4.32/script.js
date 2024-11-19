//WeakSet se usa para almacenar objetos sin impedir que sean recolectados por el garbage collector cuando no hay más referencias a ellos

// Creamos un WeakSet para el sistema de seguimiento
const paginasVisitadas = new WeakSet();

// Función para marcar una página como visitada
function marcarComoVisitada(pagina) {
    if (!paginasVisitadas.has(pagina)) { // (comprobar si la Página ha sido Visitada) Usa paginasVisitadas.has(pagina) para verificar si la página ya está en el WeakSet
        paginasVisitadas.add(pagina); // Si no está, se añade al WeakSet
        console.log(`Página visitada: ${pagina.url}`);
    } else {
        console.log(`Página ya visitada: ${pagina.url}`);
    }
}

// Función para comprobar si una página ha sido visitada
function haSidoVisitada(pagina) {
    return paginasVisitadas.has(pagina);
}

// Ejemplo 
let pagina1 = { url: 'https://www.ejemplo.com' };
let pagina2 = { url: 'https://www.otroejeplo.com' };

// Marcar páginas como visitadas
marcarComoVisitada(pagina1); // Página visitada: https://www.ejemplo.com
marcarComoVisitada(pagina2); // Página visitada: https://www.otroejeplo.com
marcarComoVisitada(pagina1); // Página ya visitada: https://www.ejemplo.com

// Comprobar si las páginas han sido visitadas
console.log(`¿Ha sido visitada la página 1? ${haSidoVisitada(pagina1)}`); // true
console.log(`¿Ha sido visitada la página 2? ${haSidoVisitada(pagina2)}`); // true

// Eliminar las referencias a las páginas
pagina1 = null;
pagina2 = null;

// Forzar el recolector de basura 
setTimeout(() => {
    console.log('Después de recolectar basura:');
    // Las páginas deberían haber sido recolectadas, por lo que no deberían estar en el WeakSet
    console.log(`¿Ha sido visitada la página 1? ${haSidoVisitada(pagina1)}`); // false
    console.log(`¿Ha sido visitada la página 2? ${haSidoVisitada(pagina2)}`); // false
}, 1000);
