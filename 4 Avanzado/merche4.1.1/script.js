let usuario = {
    title: 'Merche',
    body: 'mer@gmail.com',
    userId: 1
};

async function crearUsuario( nombre, email, userId) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: nombre,
          body: email,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => console.error('Error:', error))
}

async function listarUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => console.error('Error:', error))
}