
// Ejercicio 17
function cambiarTexto() {
    document.getElementById("text1").textContent = "Texto modificado mediante JavaScript!";
}

// Ejercicio 18
function cambiarEstilo() {
    const texto = document.getElementById('text2');
    texto.style.color = "red";
    texto.style.fontSize = "20px";
    texto.style.fontWeight = "bold";
}

// Ejercicio 19
function toggleVisibilidad() {
    const textoAOcultar = document.getElementById('text3');
    textoAOcultar.classList.toggle('hidden');
}

// Ejercicio 20
let contador = 1;
function agregarElemento() {
    const lista = document.getElementById('lista');
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = `Elemento ${contador}`;
    lista.appendChild(nuevoElemento);
}

// Ejercicio 21
const mouseArea = document.getElementById("mouseArea");
const coordenadas = document.getElementById('coordenadas');

mouseArea.addEventListener("mousemove", (event) => {
    coordenadas.textContent = `Coordenadas: (${event.clientX} , ${event.clientY})`;
})
