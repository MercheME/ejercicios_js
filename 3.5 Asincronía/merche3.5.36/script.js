
const usuario = {
    nombre: 'Usuario',
    edad: 20,
    email: 'usuario@test.com',
    password: '123456'
}

function actualizarProgreso( porcentaje ) {
    console.clear();
    const barra = `[
    ${"=".repeat(porcentaje / 10)}
    ${" ".repeat(10 - porcentaje / 10)}
    ] ${porcentaje}%`;

    console.log(barra);
}

function verificarEdad( usuario ) {
    return new Promise(( resolve, reject ) =>{
        setTimeout(() => {
           if(usuario.edad > 18){
                actualizarProgreso(33);
                console.log('Edad verificada');
                resolve(usuario);
           } else {
                reject('Error: el usuario debe de ser mayor de 18')
           }
        }, 1000);
    })
}

function verificarEmail( usuario ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return new Promise(( resolve, reject ) => {
        setTimeout(() => {
            if (emailRegex.test(usuario.email)) {
                actualizarProgreso(33);
                console.log('Email verificado');
                resolve( usuario );
            } else {
                reject('Error: el email debe contener @ y un dominio válido');
            }
        }, 1000);
    });
}

function verificarPassword( usuario ) {
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;

    return new Promise((resolve, reject) => {
        setTimeout( () =>{
            if (passwordRegex.test(usuario.password)) {
                actualizarProgreso(100);
                console.log('Contraseña verificada');
                resolve(usuario);
            } else {
                reject('Error: la contraseña debe de contener al menos 6 caracteres y un número')
            }
        }, 1000);
    });

}

function registro(usuario) {
    console.log('Iniciando validación...');
    actualizarProgreso( 0 );

    verificarEdad(usuario)
        .then(verificarEmail)
        .then(verificarPassword)
        .then((usuarioValido) => {
            console.log('El usuario es válido ', usuarioValido);
        })
        .catch((error) => {
            console.error(error);
        })
}

registro(usuario);
