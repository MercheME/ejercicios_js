fetch('https://jsonplaceholder.typicode.com/albums')
  .then(response => response.json())
  .then(data => {
    // Filtra los albumes del artista 3
    let albumsArtista3 = data.filter(album => album.userId === 3);

    // Muestra los títulos y id de los albumes 
    albumsArtista3.forEach(album => console.log(album.title + " " + album.id));
  })
  .catch(error => console.error('Error:', error));