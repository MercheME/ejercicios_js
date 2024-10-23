

class Producto {

    constructor( id, nombre, precio, stock ) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio, 
        this.stock = stock
    }

    mostrarInformacion() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Precio: ${this.precio}, Stock: ${this.stock}`;        
    }

}

class Tienda {

    constructor() {
        this.productos = new Map(),
        this.clientes = new Set(),
        this.ventas = []
    }

    agregarproducto( producto ) {
        this.productos.set(producto.id, producto );
    }

    actualizarStock( idProducto, cantidad ) {
        const producto = this.productos.get(idProducto);
        if (producto) {
            producto.stock = cantidad;
        } else {
            console.log(`No se ha encontrado el producto con el ID: ${idProducto}`);
        }
    }

    mostrarInventario() {
        this.productos.forEach( producto => {
            console.log(producto.mostrarInformacion());
        })
    }

    registarCliente( nombreCliente ) {
        if (!this.clientes.has(nombreCliente)) {
            this.clientes.add(nombreCliente);
            console.log(`Cliente ${nombreCliente} registrado`);
        } else {
            console.log(`Error. El cliente ${nombreCliente} ya está registrado`);
        }
    }

    realizarVenta( nombreCliente, idProducto, cantidad ) {
        
        //Registrar al cliente si no está registrado
        if ( !this.clientes.has(nombreCliente) ) {
            this.registarCliente(nombreCliente);
        }

        // Buscar el producto
        const producto = this.productos.get(idProducto);
        if ( !producto ) {
            console.log(`Producto con ID: ${idProducto} NO encontrado.`);
            return;
        }

        // verificar el stock
        if ( producto.stock < cantidad ) {
            console.log(`Stock insuficiente para el producto: ${producto.nombre}`);
            return;
        }

        //Realizar la venta y actualizar stock
        producto.stock -= cantidad;
        const total = producto.precio * cantidad;
        this.ventas.push({ cliente: nombreCliente, idProducto, cantidad, total });

        console.log(`Venta realizada: ${nombreCliente} compró ${cantidad} ${producto.nombre}(s) por un total de ${total}`);
    }

    mostrarVentas() {
        this.ventas.forEach( venta => {
            console.log(`Cliente: ${venta.cliente}, Producto ID: ${venta.idProducto}, Cantidad: ${venta.cantidad}, Total: ${venta.total}`);
        });
    }

    productosSinStock() {
        return Array.from(this.productos.values()).filter( producto => producto.stock === 0);
    }

    ventasPorCliente( nombreCliente ) {
        const ventasCliente = this.ventas.filter( venta => venta.cliente === nombreCliente);

        if (ventasCliente.length > 0) {
            ventasCliente.forEach(venta => {
                console.log(`Producto ID: ${venta.idProducto}, Cantidad: ${venta.cantidad}, Total: ${venta.total}`);
            });
        } else {
            console.log(`El cliente ${nombreCliente} aún no ha realizado ninguna venta`);
        }
    }

    calcularIngresosTotales() {
        return this.ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);
    }

}


// Creamos la tienda
const tienda = new Tienda();

console.log('🏪 Tienda Online');

// Creamos y añadimos productos
const producto1 = new Producto(1, "Laptop", 1000, 10);
const producto2 = new Producto(2, "Mouse", 20, 50);
const producto3 = new Producto(3, "Teclado", 30, 30);
const producto4 = new Producto(4, "Monitor", 200, 0);  // Sin stock
const producto5 = new Producto(5, "Auriculares", 50, 15);

tienda.agregarproducto(producto1);
tienda.agregarproducto(producto2);
tienda.agregarproducto(producto3);
tienda.agregarproducto(producto4);
tienda.agregarproducto(producto5);

// Registramos clientes
console.log("\n--- Clientes registrados ---");
tienda.registarCliente('Merche');
tienda.registarCliente('Gabi');
tienda.registarCliente('Adrián');

// Mostrar inventario
console.log("\n--- Inventario ---");
tienda.mostrarInventario();


console.log("\n--- Ventas realizadas ---");
// Realizar ventas
tienda.realizarVenta('Merche', 1, 2); // Merche compra 2 laptop
tienda.realizarVenta('Gabi', 4, 3) // Gabi compra 3 monitor
tienda.realizarVenta('Adrián', 3, 20) // Adri compra 20 teclaso
tienda.realizarVenta('Gabi', 5, 15); //Gabi compra 10 auriculares
tienda.realizarVenta('Adrián', 2, 10); //Adri compra 10 mouse

// Mostrar inventario
console.log("\n--- Inventario ---");
tienda.mostrarInventario();


// Mostrar ventas
console.log("\n--- Resumen de ventas ---");
tienda.mostrarVentas();

// Mostrar productos sin stock
console.log("\n--- Productos sin stock ---");
const productosSinStock = tienda.productosSinStock();
productosSinStock.forEach(producto => console.log(producto.mostrarInformacion()));

// Mostrar ventas por cliente
console.log("\n--- Ventas de Adrián ---");
tienda.ventasPorCliente("Adrián");

// Calcular y mostrar ingresos totales
const ingresosTotales = tienda.calcularIngresosTotales();
console.log(`\n--- Ingresos Totales ---\n  ${ingresosTotales} €`);