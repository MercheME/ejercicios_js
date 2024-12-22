
function savePreferences() {
    const theme = document.getElementById("themeSelector").value;
    const fontSize = document.getElementById("fontSizeSelector").value;
    const language = document.getElementById("languageSelector").value;

    const preferencias = {
        theme,
        fontSize,
        language
    };

    // guardar esas preferencias en forma de texto en el localstorage, para ello hay que convertir de json a texto
    localStorage.setItem('userPreferences', JSON.stringify(preferencias));

    applyPreferences(preferencias);
}

function applyPreferences( preferencias ) {
    // aplicar el tema
    if (preferencias.theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }

    // aplicar el font-size
    if (preferencias.fontSize === 'small') {
        document.body.style.fontSize = '12px';
    } else if (preferencias.fontSize === 'medium') {
        document.body.style.fontSize = '16px';
    } else if (preferencias.fontSize === 'large') {
        document.body.style.fontSize = '20px';
    }

    // cambiar el lenguaje del texto estático
    if (preferencias.language === 'en') {
        document.querySelector('h1').textContent = 'Preferences Manager';

        document.querySelector('h2').textContent = 'Settings';
        document.querySelectorAll('h2')[1].textContent = 'User Profile';
        document.querySelector('button').textContent = 'Save Preferences';
        document.querySelector('button[onclick="resetPreferences()"]').textContent = 'Restore Default';
        
        document.querySelector('#username').placeholder = 'Username';
        document.querySelector('#email').placeholder = 'Email';
    } else {
        document.querySelector('h1').textContent = 'Gestor de Preferencias';
        
        document.querySelector('h2').textContent = 'Configuraciones';
        document.querySelectorAll('h2')[1].textContent = 'Perfil de usuario';
        
        document.querySelector('button').textContent = 'Guardar Preferencias';
        document.querySelector('button[onclick="resetPreferences()"]').textContent = 'Restaurar Predeterminadas';
        
        document.querySelector('#username').placeholder = 'Nombre de Usuario';
        document.querySelector('#email').placeholder = 'Correo Electrónico';

    }
}

//resetear las preferencias por defecto
function resetPreferences() {
    // eliminarlas de localstorage
    localStorage.removeItem('userPreferences');

    // volver a los valores por defecto
    document.getElementById("themeSelector").value = 'light';
    document.getElementById("fontSizeSelector").value = 'medium';
    document.getElementById("languageSelector").value = 'es';

    applyPreferences({
        theme: 'light',
        fontSize: 'medium',
        language: 'es'
    });
}

// para guardar el perfil del usuario
function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const perfil = { username, email };

    localStorage.setItem('userProfile', JSON.stringify(perfil));

    alert('perfil guardado correctamente');
}

// Fara restaurar el perfil del usuario
function restaurarPerfil() {
    //Volver a convertirlo en json
    const perfil = JSON.parse(localStorage.getItem('userProfile'));

    if (perfil) {
        document.getElementById('username').value = perfil.username;
        document.getElementById('email').value = perfil.email;
    }
}

// cuando la pagina cargue restaurar las prefencias y el perfil del usuario
window.onload = function() {
    const guardarPreferencias = localStorage.getItem('userPreferences');

    if (guardarPreferencias) {
        applyPreferences(JSON.parse(guardarPreferencias));
    } else {
        resetPreferences();
    }

    restaurarPerfil();
};
