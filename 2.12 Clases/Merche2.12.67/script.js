
class Coche {
    // inicializa las propiedades del coche
    constructor(marca, modelo, año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }

    obtenerDescripcion() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`;
    }
}

// Creando instancias de la clase Coche
const coche1 = new Coche("Toyota", "Corolla", 2020);
const coche2 = new Coche("Ford", "Focus", 2018);
const coche3 = new Coche("Honda", "Civic", 2022);

// Mostrando resultados
console.log(coche1.obtenerDescripcion());
console.log(coche2.obtenerDescripcion());
console.log(coche3.obtenerDescripcion());
