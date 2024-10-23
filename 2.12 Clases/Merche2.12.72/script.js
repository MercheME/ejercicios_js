

class Configuracion {
    // Propiedad estática para mantener una única instancia
    static instancia = null;

    constructor( configuracionesIniciales ) {

        // Si ya existe una instancia, devolvemos esa misma y salimos del constructor
        if (Configuracion.instancia) {
            throw new Error("No puedes crear más de una instancia de Configuracion.");
        }

        //  Guardamos las configuraciones iniciales
        this.configuraciones = configuracionesIniciales || {};

        // Guardar la instancia actual como única instancia
        Configuracion.instancia = this;
    }


    // Método estático que devuelve la única instancia (o la crea si no existe)
    static getInstancia( configuracionesIniciales ) {
        if (Configuracion.instancia === null) {
            Configuracion.instancia = new Configuracion(configuracionesIniciales);
        }
        return Configuracion.instancia;
    }

    obtenerConfiguracion( clave ) {
        return this.configuraciones[clave];
    }

    establecerConfiguracion( clave, valor ) {
        this.configuraciones[clave] = valor;
    }

}


// Crear la primera instancia
const config1 = new Configuracion({ tema: "oscuro", lenguaje: "español" });

console.log(config1.obtenerConfiguracion("tema"));  // "oscuro"

// Cambiar una configuración
config1.establecerConfiguracion("tema", "claro");
console.log(config1.obtenerConfiguracion("tema"));  // "claro"

// Intentar crear otra instancia (no debería permitirlo)
const config2 = new Configuracion({ tema: "oscuro", lenguaje: "inglés" });

// Ver que config2 es la misma instancia que config1
console.log(config2.obtenerConfiguracion("tema"));  // "claro" (la misma instancia)

