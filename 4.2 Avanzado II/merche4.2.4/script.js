


document.getElementById('loadUsers').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const usersTableBody = document.querySelector('#usersTable tbody');

    errorDiv.innerText = '';
    loadingDiv.style.display = 'block';

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

            loadingDiv.style.display = 'none';

            const data = JSON.parse(xhr.responseText);


            // OJO limpiar por si hay datos previos
            usersTableBody.innerHTML = '';
            
            data.forEach( user => {
                const fila = document.createElement('tr');
                const filaNombre = document.createElement('td');
                const filaEmail = document.createElement('td');

                filaNombre.innerHTML = user.name;
                filaEmail.innerHTML = user.email;

                fila.appendChild(filaNombre);
                fila.appendChild(filaEmail);

                usersTableBody.appendChild(fila);

            })

            //todo Averiguar porqué ejecuta tanto el if como el else
        } else {
            errorDiv.innerText = `Error al cargar los datos: ${xhr.status}`;
        }
    }

    xhr.send();
    
});