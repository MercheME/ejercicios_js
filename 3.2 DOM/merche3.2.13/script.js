document.addEventListener('DOMContentLoaded', function() {
    const duplicateButton = document.getElementById('duplicateButton');
    const inputText = document.getElementById('inputText');
    const textDisplay = document.getElementById('textDisplay');

    duplicateButton.addEventListener('click', function() {
        const text = inputText.value;
        textDisplay.textContent = text + ' ' + text;
    })
})