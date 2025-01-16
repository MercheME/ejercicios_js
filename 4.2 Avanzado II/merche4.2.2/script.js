const formulario = $('#registroForm')

const txtNombre = $('#nombre');
const txtEmail = $('#email');
const txtPassword = $('#password');

$(document).ready(function() {

    $("#registroForm").on( 'submit', function(e) {
        e.preventDefault();

        if (txtNombre.val().trim() === "") {
            $('#nombreError').show();
        } else {
            $('#nombreError').hide();
        }

        if (!txtEmail.val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            $('#emailError').show();
        } else {
            $('#emailError').hide()
        }

        if (txtPassword.val().length <= 7) {
            $('#passwordError').show();
        } else {
            $('#passwordError').hide()
        }
        
    })
  });

