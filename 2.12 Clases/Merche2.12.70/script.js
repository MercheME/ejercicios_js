

class Empleado {
    // inicializa las propiedades del empleado
    constructor(nombre, salario) {
        this.nombre = nombre,
        this.salario = salario
    }

    trabajar() {
        return console.log(`${this.nombre} está trabajando`);
    }
}

// Creando instancias de la clase empleado y mostrando resultados
const empleado1 = new Empleado('Merche', 1000);
console.log(JSON.stringify(empleado1));
empleado1.trabajar();


class Gerente extends Empleado{
    
    constructor(nombre, salario, departamento) {
        super(nombre, salario),
        this.departamento = departamento
    }

    dirigir() {
        return console.log(`${this.nombre} está dirigiendo el departamento de ${this.departamento}.`);
    }
}


const gerente1 = new Gerente("Lucía", 5000, "Ventas");
console.log(JSON.stringify(gerente1));
gerente1.dirigir();
gerente1.trabajar(); // Como hereda los métodos de la clase padre 'Empleado' podemos usarlos en la clase hija 'Gerente'

