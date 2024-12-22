const urlApi = "https://jsonplaceholder.typicode.com/users";
const userTablaFetch = document.getElementById("userTableFetch").querySelector("tbody");
const userTablaAxios = document.getElementById("userTableAxios").querySelector("tbody");
const userForm = document.getElementById("userForm");

function crearUsuario(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const nuevoUsuario = { name, email };

    // add usuario con fetch a su tabla
    fetch(urlApi, {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(usuarioFetch => {
        const filaFetch = crearFilaUsuario(usuarioFetch, "fetch");
        userTablaFetch.appendChild(filaFetch);
    })
    .catch(error => console.error('Error al crear el usuario con Fetch:', error));

    // add usuario con axios a su tabla
    axios.post(urlApi, nuevoUsuario)
    .then(response => {
        const filaAxios = crearFilaUsuario(response.data, "axios");
        userTablaAxios.appendChild(filaAxios);
    })
    .catch(error => console.error('Error al crear el usuario con Axios:', error));
}

// Listar usuarios con fetch
function listarUsuarios() {
    fetch(urlApi)
        .then(response => response.json())
        .then(users => {
            userTablaFetch.innerHTML = ''; // Limpiar tabla antes de agregar datos

            users.forEach(usuario => {
                const filaFetch = crearFilaUsuario(usuario, "fetch");
                userTablaFetch.appendChild(filaFetch);
            });
        })
        .catch(error => console.error('Error al listar usuarios con Fetch:', error));
}

// Listar usuarios con Axios
function listarUsuariosAxios() {
    axios.get(urlApi)
        .then(response => {
            userTablaAxios.innerHTML = '';

            response.data.forEach(usuario => {
                const filaAxios = crearFilaUsuario(usuario, "axios");
                userTablaAxios.appendChild(filaAxios);
            });
        })
        .catch(error => console.error('Error al listar usuarios con Axios:', error));
}

// crear una fila de usuario para agregar a las tablas
function crearFilaUsuario(usuario, metodo) {
    const fila = document.createElement("tr");

    fila.setAttribute("user-id", usuario.id); 
    
    //TODO tener claro como funcona el setAtributte, esta línea agrega el atributo 'user-id' con el valor id del usuario y lo guarda dentor de esa fila (tr), lo que permite poder acceder o encontrar luego a la fila usando el valor del 'user-id'

    fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td><button class="eliminar-btn" onclick="eliminarUsuario(${usuario.id}, '${metodo}')">Eliminar</button></td>
    `;
    return fila;
}

// Eliminar usuario de las tablas y de la API
function eliminarUsuario(id, metodo) {
    const url = `${urlApi}/${id}`;
    let eliminarApi;

    if (metodo === "fetch") {
        eliminarApi = fetch(url, { method: 'DELETE' });
    } else if (metodo === "axios") {
        eliminarApi = axios.delete(url);
    }

    eliminarApi
        .then(() => {
            console.log(`Usuario con ID ${id} eliminado con ${metodo}`);

            const tablas = [userTablaFetch, userTablaAxios];

            // Eliminar de ambas tablas
            tablas.forEach(tabla => {

                const fila = tabla.querySelector(`tr[user-id="${id}"]`);

                if (fila) fila.remove();
            });
        })
        .catch(error => {
            console.error(`Error al eliminar el usuario con ${metodo}: ${error}`);
        });
}

listarUsuarios();
listarUsuariosAxios(); 
userForm.addEventListener("submit", crearUsuario);
