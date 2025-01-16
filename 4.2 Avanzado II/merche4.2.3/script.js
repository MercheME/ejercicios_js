
$(document).ready(function () {

    $('#addTask').click(function () {
        const textoTarea = $('#newTask').val().trim(); // asignar el texto de la tarea
        
        if (textoTarea) {
            const nuevaTarea = $(`
                <li>
                    <span class="taskText">${textoTarea}</span>
                    <button class="completeTask">Completar</button>
                    <button class="deleteTask">Eliminar</button>
                </li>
            `);
            
            // Añadir la nueva tarea
            // Enlace https://api.jquery.com/category/effects/
            // hide -> ocultar los elementos coincidentes.
            // fadeIn -> que cambia gradualmente la opacidad de los elementos seleccionados, de oculto a visible (efecto de desvanecimiento)
            nuevaTarea.hide().appendTo('#taskList').fadeIn();

            // OJO -> limpiar el input al terminar
            $('#newTask').val('');
        }
    });

    $('#taskList').on('click', '.completeTask', function () {
        let tareaItem = $(this).parent(); // elemento <li> que contiene todo

        let tareaTexto = tareaItem.find('.taskText'); // dentro del <li>, buscamos el texto de la tarea
        tareaTexto.toggleClass('completed'); // toggle a la clase 'completed'
    });

   
    $('#taskList').on('click', '.deleteTask', function () {
        let tareaItem = $(this).parent(); 

        tareaItem.fadeOut(300, () =>  taskItem.remove()); 
    });
});
