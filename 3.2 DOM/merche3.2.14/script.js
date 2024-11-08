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