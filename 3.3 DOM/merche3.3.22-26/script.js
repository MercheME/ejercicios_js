// Ejercicio 22 -------------------------------------------------------------------------------------------------------------

let nodoSeleccionado = null; // poner a null inicialmente ya que no debe de salir ningun nodo seleccionado 
const treeRoot = document.getElementById('treeRoot'); // nodoRaiz

function agregarNodoArbol() {
    const nodoNuevo = document.createElement('div');
    nodoNuevo.classList.add('tree-node');

    // el math.random() genera un num aleatorio entre 0 y 1
    // con to.string() convierte ese num aleatorio en una cadena en base 36 -> incluye los dígitos del 0 al 9 y las letras de la "a" a la "z"
    //con subtring(start, lenght) devuelve una parte de la cadena
    nodoNuevo.textContent = `Nodo ${Math.random().toString(36).substring(2 , 9)}`;
    
    nodoNuevo.onclick = () => seleccionarNodo( nodoNuevo );

    //Si hay un nodo seleccionado (nodoSeleccionado no es null), el nuevo nodo se agrega como hijo del nodo selecionado. Si no hay ningún nodo seleccionado, el nuevo nodo se agrega al treeRoot.
    if (nodoSeleccionado) {
        nodoSeleccionado.appendchild( nodoNuevo );
    } else {
        treeRoot.appendChild( nodoNuevo );
    }
    
}

function seleccionarNodo( nodo ) {
    if (nodoSeleccionado === nodo) { 
        nodo.classList.remove('selected'); 
        nodoSeleccionado = null; 
    } else {
        // Si el nodo no está seleccionado, primero se quita la selección del nodo actualmente seleccionado (si lo hay), luego se selecciona el nuevo nodo añadiendo la clase selected y actualizando nodoSeleccionado
        if (nodoSeleccionado) {
            nodoSeleccionado.classList.remove('selected'); 
        }
        nodoSeleccionado = nodo; 
        nodoSeleccionado.classList.add('selected'); 
    }
}

function eliminarNodoSeleccionado() {
    if (nodoSeleccionado) {
        nodoSeleccionado.remove();
        nodoSeleccionado = null;
    }
}


// Ejercicio 23 - Sistema Drag and Drop -------------------------------------------------------------------------

const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');
let offsetX, offsetY, initialX, initialY, isDragging = false;

// Añadir un evento al elemento draggable que se activa cuando el botón del ratón se presiona (mousedown)
draggable.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - draggable.getBoundingClientRect().left; // Element.getBoundingClientRect() devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización (viewport).
    offsetY = e.clientY - draggable.getBoundingClientRect().top;

    initialX = draggable.getBoundingClientRect().left;
    initialY = draggable.getBoundingClientRect().top;

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (isDragging) {
        draggable.style.left = `${e.clientX - offsetX}px`;
        draggable.style.top = `${e.clientY - offsetY}px`; 
    }
}

function onMouseUp(e) {
   document.removeEventListener('mousemove', onMouseMove);
   document.removeEventListener('mouseup', onMouseUp);

   isDragging = false;

   // Si el elemento draggable esta dentro de dropzone
   const dropzoneRect = dropzone.getBoundingClientRect();
   const draggableRect = draggable.getBoundingClientRect();

   if( draggableRect.left >= dropzoneRect.left &&
    draggableRect.top >= dropzoneRect.top &&
    draggableRect.right <= dropzoneRect.right &&
    draggableRect.bottom <= dropzoneRect.bottom ) {
    console.log('Elemento soltado en la dropzone');
    
   } else {
    draggable.style.left =` ${initialX}px`;
    draggable.style.top = `${initialY}px`;
    console.log('Elemento soltado fuera de la dropzone');
    
   }
}


//Ejercicio 24  --------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() { // La función DOMContentLoaded asegura que el código JavaScript se ejecute una vez que todo el HTML se haya cargado
    const form =document.getElementById('validationForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');

    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');

   
    form.addEventListener('input', (event) => validaCampo(event.target));  // Escucha los cambios en los campos y llama a validaCampo en tiempo real para mostrar errores

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let esValido = true;

        esValido = validaCampo(nombreInput) && esValido;
        esValido = validaCampo(emailInput) && esValido;
        esValido = validaCampo(telefonoInput) && esValido;

        if (esValido) {
            alert('✅ Formulario enviado correctamente');
        }
    })

    function validaCampo(input) {
        let esValido = true;

        switch (input.name) {
            case 'nombre':
                if ( input.value.length < 3 ) {
                    nombreError.textContent = 'El nombre debe de tener al menos 3 elementos';
                    esValido = false;
                } else {
                    nombreError.textContent = '';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if ( !emailRegex.test(input.value) ) {
                    emailError.textContent = 'El email debe de tener un formato válido';
                    esValido = false;
                } else {
                    emailError.textContent = '';
                }
                break;
            case 'telefono':
                const telefonoRegex = /^\d{9}$/;
                if (!telefonoRegex.test(input.value)) {
                    telefonoError.textContent = 'El teléfono debe de tener  9 dígitos';
                    esValido = false;
                } else {
                    telefonoError.textContent = '';
                }
                break;
            default:
                break;
        }
        
        return esValido;
    }

})

// Ejercicio 25 - Mutation Observer-----------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const observado = document.getElementById('observado');
    const modificarBtn = document.getElementById('modificar');

    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                console.log('Atributo modificado:', mutation.attributeName);
            } else if (mutation.type === 'childList') {
                console.log('Cambio en estructura de hijos:', mutation);
            } else if (mutation.type === 'characterData') {
                console.log('Cambio en contenido:', mutation.target.data);
            }
        }
    });

    // Opciones de observación
    const config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };

    // Iniciar la observación
    observer.observe(observado, config);

    function realizarModificaciones() {
        // Modificar un atributo
        observado.setAttribute('data-random', Math.random().toString(36).substring(7));

        // Modificar el contenido
        observado.textContent = 'Contenido modificado: ' + Math.random().toString(36).substring(7);

        // Añadir un nuevo hijo
        const nuevoElemento = document.createElement('div');
        nuevoElemento.textContent = 'Nuevo elemento hijo';
        observado.appendChild(nuevoElemento);
    }

    // Añadir un evento al botón para realizar modificaciones aleatorias
    modificarBtn.addEventListener('click', realizarModificaciones);
});

// Ejercicio 26 - Delegacion de Eventos ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer'); 
    let buttonContador = 0; 
    
    // Función para añadir un nuevo botón dinámicamente 
    window.agregarBotonDinamico = function() { 
        buttonContador++; 
 
        const nuevoBtn = document.createElement('button'); 
        nuevoBtn.className = 'btn btn-secondary '; 
        nuevoBtn.textContent = `Botón ${buttonContador}`; 
        nuevoBtn.id = `boton-${buttonContador}`; 
 
        buttonContainer.appendChild(nuevoBtn); }; 

        // Delegación de eventos para manejar clik en los botones 
        buttonContainer.addEventListener('click', function(event) { 
            if (event.target && event.target.nodeName === 'BUTTON') { 
                alert(`ID del botón: ${event.target.id}`); 
            } 
        });
})
