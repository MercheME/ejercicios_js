
let datosFormulario = {
    nombre: "Merche Moreno",
    correo: "merche.moreno@example.com",
    edad: 28
};

let datosJSON = JSON.stringify(datosFormulario);

fetch('https://api.ejemplo.com/enviar', {
    method: 'POST',                      // Método POST para enviar los datos
    headers: {
        'Content-Type': 'application/json'  // Tipo de contenido JSON
    },
    body: datosJSON                         // Cuerpo de la solicitud con los datos en formato JSON
})
.then( response => {
    if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    return response.json();                 
})
.then(data => {
    console.log("Respuesta del servidor:", data);  
})
.catch(error => {
    console.error("Error al enviar los datos:", error);
});
