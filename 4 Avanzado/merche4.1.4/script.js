

// Cargar tareas desde el localStorage, si existen
let tareas = JSON.parse(localStorage.getItem('tasks')); 

if (!tareas) { 
    tareas = []; // Si no hay tareas inicializamos el array
}

function renderTasks() {
    const listaTareas = document.getElementById('taskList');
    listaTareas.innerHTML = ''; // Limpiar la lista antes de agregar (como hice en ej anteriores)

    const filter = document.getElementById('filterSelect').value;

    // Filtramos las tareas dependiendo del filtro seleccionado
    const filtrarTareas = tareas.filter(function( tarea ) {
        if (filter === 'pendientes') {
            return !tarea.completed; 
        }
        if (filter === 'completadas') {
            return tarea.completed; 
        }
        return true; // si es "todas", mostramos todas las tareas
    });

    // mostar las tareas filtradas en el DOM
    filtrarTareas.forEach( function(tarea, index) {
        const li = document.createElement('li'); 

        if (tarea.completed) {
            li.classList.add('completed'); // si la tarea está completada, le agregamos una clase css
        }

        li.innerHTML = `
            <span>${tarea.name} - ${tarea.priority}</span>
            <button onclick="toggleComplete(${index})">${tarea.completed ? 'Desmarcar' : 'Marcar como completada'}</button>
            <button onclick="deleteTask(${index})">Eliminar</button>
        `;
        listaTareas.appendChild(li); 
    });
}


// Cuando se envie el formulario de añadir una tarea
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtenemos los valores del input y el select
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');

    const nombreTarea = taskInput.value; 
    const prioridadTarea = prioritySelect.value; 

    // Si el nombre de la tarea no está vacío
    if (nombreTarea.trim() !== '') {
    
        const nuevaTarea = {
            name: nombreTarea,      
            completed: false,   
            priority: prioridadTarea 
        };

        tareas.push(nuevaTarea);
        localStorage.setItem('tasks', JSON.stringify(tareas)); // Guardamos las tareas en localStorage

        taskInput.value = ''; // Limpiar el input del formulario
        renderTasks(); // Volvera renderizar las tareas
    } else {
        console.log('La tarea debe de contener un nombre');
    }
});


function toggleComplete(index) {
    tareas[index].completed = !tareas[index].completed;

    localStorage.setItem('tasks', JSON.stringify(tareas)); 

    renderTasks(); 
}

function deleteTask(index) {
    tareas.splice(index, 1); 

    localStorage.setItem('tasks', JSON.stringify(tareas));
    
    renderTasks(); 
}

// Filtrar las tareas cuando se cambia la opción de filtro IMPORTANTE
document.getElementById('filterSelect').addEventListener('change', renderTasks);

renderTasks();