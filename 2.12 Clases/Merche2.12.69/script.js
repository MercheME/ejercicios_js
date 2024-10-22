

class Persona {
    // inicializa las propiedades de la persona
    constructor(nombre, edad, trabajo) {
        this.nombre = nombre,
        this.edad = edad,
        this.trabajo = trabajo
    }

    cambiarNuevoTrabajo( nuevoTrabajo ) {
        this.trabajo = nuevoTrabajo;
    }
}

// Creando instancias de la clase persona y mostrando resultados
const persona1 = new Persona('Merche', 27, 'Veterinaria');
console.log(JSON.stringify(persona1));
persona1.cambiarNuevoTrabajo('Desarrolladora');
console.log(`La persona '${persona1.nombre}' ha cambiado de trabajo: ${JSON.stringify(persona1)}`);



const persona2 = new Persona('Ramón', 23, 'Camarero');
console.log(JSON.stringify(persona2));
persona2.cambiarNuevoTrabajo('Cocinero');
console.log(`La persona '${persona2.nombre}' ha cambiado de trabajo: ${JSON.stringify(persona2)}`);



const persona3 = new Persona('Juan', 29, 'Peluquero');
console.log(JSON.stringify(persona3));
persona3.cambiarNuevoTrabajo('Profesor');
console.log(`La persona '${persona3.nombre}' ha cambiado de trabajo: ${JSON.stringify(persona3)}`);
