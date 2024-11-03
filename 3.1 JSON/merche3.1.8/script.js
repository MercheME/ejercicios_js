
let nombre = prompt("Escribe tu nombre: ");

fetch(`https://api.nationalize.io/?name=${nombre}`)
  .then(response => response.json())
  .then(data => {
   
    // Controlar si no hay datos
    if (data.country && data.country.length > 0) {

        // El primer objeto del array que devuelve es el que tiene mayor probabilidad
        let paisConMayorProbabilidad = data.country[0];

        fetch(`https://restcountries.com/v3.1/alpha/${paisConMayorProbabilidad.country_id}`)
          .then(response => response.json())
          .then(countryData => {
            let countryName = countryData[0].name.common;

            //Mostrar resultado
            console.log(`El país con mayor probabilidad para el nombre ${nombre} es ${countryName} (${paisConMayorProbabilidad.country_id}) con una probabilidad de ${paisConMayorProbabilidad.probability}.`);
          })
          .catch(error => console.error('Error al obtener el nombre del país:', error));

      } else {
        console.log(`No se encontraron resultados para el nombre ${nombre}.`);
      }
  })
  .catch(error => console.error('Error:', error));