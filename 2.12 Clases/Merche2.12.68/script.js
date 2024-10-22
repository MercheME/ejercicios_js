
class Rectangulo {
    // inicializa las propiedades
    constructor(ancho, alto) {
       this.ancho = ancho,
       this.alto = alto
    }

    // Método que calcula el área
    calcularAreaRectangulo() {
        return `El área es: ${this.alto * this.ancho}`;
    }
}

// Creando instancias de la clase Rectangulo
const rectangulo1 = new Rectangulo(10, 3);
const rectangulo2 = new Rectangulo(20, 10);
const rectangulo3 = new Rectangulo(5, 2);


// Mostrando resultados
console.log(rectangulo1.calcularAreaRectangulo());
console.log(rectangulo2.calcularAreaRectangulo());
console.log(rectangulo3.calcularAreaRectangulo());
