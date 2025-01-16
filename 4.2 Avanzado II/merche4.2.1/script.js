
const cuadrado = $('#targetDiv');


$(document).ready(function() {
    $('#btnColor').click(function() {
        cuadrado.toggleClass('cambiaColor');
    })

    $('#btnText').click(function() {
        cuadrado.text('¡Hola Mundo!')
    })

    $('#btnToggle').click(function() {
        cuadrado.toggleClass('visibilidadCuadrado')
    })

})