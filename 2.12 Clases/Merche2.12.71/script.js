
class Banco {

    // así definimos las propiedades privadas
    #balance;

    constructor( balanceInicial = 0 ) {
        this.#balance = balanceInicial;
    }

    depositar( cantidad ) {
        if (cantidad > 0) {
            this.#balance += cantidad;
            console.log(`Has depositado ${cantidad}. Nuevo balance: ${this.#balance}.`);
        } else {
            console.log('La cantidad a depositar debe de ser mayo a 0.');
        }
    }

    retirar( cantidad ) {
        if (cantidad > 0) {
            if (cantidad <= this.#balance) {
                this.#balance -= cantidad;
                console.log(`Has retirado ${cantidad}. Nuevo balance: ${this.#balance}`);
            } else {
                console.log('Fondos insuficientes para realizar la retirada.');
            }
        } else {
            console.log('La cantidad a retirar debe de ser mayor a 0.');
        }
    }

    obtenerBalance() {
        return this.#balance;
    }
}


const miBanco = new Banco(1000);


// Probando la clase
miBanco.depositar(50);
console.log(miBanco.obtenerBalance());
miBanco.retirar(550);
console.log(miBanco.obtenerBalance());


// Manejo de errores
miBanco.retirar(600); 
miBanco.retirar(-3);
miBanco.depositar(-2);

