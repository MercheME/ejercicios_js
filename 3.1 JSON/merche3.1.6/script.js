fetch("./alumnos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al leer el archivo JSON');
        }
        return response.json();
    })

    .then( alumnos => {
        alumnos.forEach( alumno => {
            alumno.nota += 1;
        })

        alumnos.forEach( alumno => {
            console.log(`Nombre: ${alumno.nombre}, "Nota: ${alumno.nota}"`);
        })
    })



    