

document.addEventListener('DOMContentLoaded', function() {

    const changeColorButton = this.getElementById('changeColorButton');

    changeColorButton.addEventListener('click', function() {
        document.body.style.backgroundColor = 'lightblue';
    })

    showAlertButton.addEventListener('click', function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        alert(`Medidas de la ventana --> Ancho: ${width}px, Alto: ${height}px`);
    })

});

document.addEventListener('DOMContentLoaded', function() { 
    const paragraph = document.getElementById('paragraph');
    const currentUrl = window.location.href; 
    paragraph.textContent = `La URL actual de la página es: ${currentUrl}`; 
})