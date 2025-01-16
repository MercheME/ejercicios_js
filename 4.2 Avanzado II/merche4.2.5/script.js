
const buscadorInput = document.getElementById('searchInput');
const categoria = document.getElementById('categoryFilter');
const productosLista = document.getElementById('productList');

const productos = document.querySelectorAll('.product');

function filterProducts() {

    const buscadorTexto = buscadorInput.value.toLowerCase();
    const seleccionadaCategoria = categoria.value;

    productos.forEach( producto => {
        
        const productoNombre = producto.querySelector('h3').innerText.toLowerCase();
        const productoCategoria = producto.dataset.category;

        // verificar si el producto coincide con los filtros
        const matchesBuscador = productoNombre.includes(buscadorTexto);
        const matchesCategoria = !seleccionadaCategoria || productoCategoria === seleccionadaCategoria;

        // mostrar u ocultar segun si coinciden o no
        if (matchesBuscador && matchesCategoria) {
            $(producto).stop().fadeIn(); 
        } else {
            $(producto).stop().fadeOut(); 
        }
    });

}

// Lanzado los eventos
buscadorInput.addEventListener('input', filterProducts);
categoria.addEventListener('change', filterProducts);
