let datosJson = [
    {"nombre" : "Laptop", "precio": 1500, "stock": 5},
    {"nombre" : "Teclado", "precio": 50, "stock": 15},
    {"nombre" : "Monitor", "precio": 200, "stock": 8},
];

let productosFiltrados = datosJson.filter(producto => {
  return producto.precio > 100
});

productosFiltrados.forEach( producto => {
    console.log(`Nombre: ${producto.nombre}`);
})
