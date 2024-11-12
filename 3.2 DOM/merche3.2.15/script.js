document.addEventListener('DOMContentLoaded', function() {
    const duplicateButton = document.getElementById('duplicateButton');
    const inputText = document.getElementById('inputText');
    const textDisplay = document.getElementById('textDisplay');

    duplicateButton.addEventListener('click', function() {
        const text = inputText.value;
        textDisplay.textContent = text + ' ' + text;
    })

    const moveWindow = document.getElementById('moveWindowButton');
    moveWindow.addEventListener('click', function() {
        const pxMover = 100;
        window.moveBy(pxMover, pxMover);
    })

})

document.getElementById('mouseInfo').addEventListener('mousemove', function(event) {
    this.textContent = `Coordenadas del ratón: X: ${event.clientX}, Y: ${event.clientY}`;
});


