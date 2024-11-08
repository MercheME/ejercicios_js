

document.addEventListener('DOMContentLoaded', function() {
    const changeColorButton = this.getElementById('changeColorButton');

    changeColorButton.addEventListener('click', function() {
        document.body.style.backgroundColor = 'lightblue';
    })

});