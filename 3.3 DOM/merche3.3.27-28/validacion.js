// Ejercicio 27 -----------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const basicForm = document.getElementById('basicForm');
    const basicFileInput = document.getElementById('basicFileInput');
    const basicError = document.getElementById('basicError');
    const basicSuccess = document.getElementById('basicSuccess');
    const imagePreview = document.getElementById('imagePreview');

    // Función para validar el archivo seleccionado
    function validateFile(file) {
        // Limpiar mensajes por si tubiera algun valor previamente
        basicError.textContent = '';
        basicSuccess.textContent = '';
        imagePreview.src = '';

        if (!file) {
            basicError.textContent = 'No se ha seleccionado ningún archivo.';
            return false;
        }

        // Verificar que el archivo es una imagen
        if (!file.type.startsWith('image/')) {
            basicError.textContent = 'El archivo seleccionado no es una imagen.';
            return false;
        }

        // Verificar tamaño del archivo (máximo 1MB)
        if (file.size > 1024 * 1024) {
            basicError.textContent = 'El archivo supera el tamaño máximo de 1MB.';
            return false;
        }

        // Mostrar vista previa de la imagen
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        basicSuccess.textContent = 'El archivo es válido.';
        return true;
    }

    // Evento de cambio en el input de archivo
    basicFileInput.addEventListener('change', function() {
        const file = basicFileInput.files[0];
        validateFile(file);
    });

    // Validar el formulario al enviar
    basicForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        const file = basicFileInput.files[0];
        if (validateFile(file)) {
            alert('Formulario enviado correctamente.');
        }
    });
});
 

// Ejercicio 28 ------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

    const zonaDeArrastre = document.getElementById('dropZone');
    const entradaArchivos = document.getElementById('advancedFileInput');
    const listaArchivos = document.getElementById('fileList');

    const advancedError = document.getElementById('advancedError');
    const advancedSuccess = document.getElementById('advancedSuccess');
    const barraProgreso = document.getElementById('uploadProgress');

    let archivosParaSubir = [];

    // Asignar eventos de arrastre y sueltos
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nombreEvento => {
        zonaDeArrastre.addEventListener(nombreEvento, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(nombreEvento => {
        zonaDeArrastre.addEventListener(nombreEvento, () => zonaDeArrastre.classList.add('dragging'), false);
    });

    ['dragleave', 'drop'].forEach(nombreEvento => {
        zonaDeArrastre.addEventListener(nombreEvento, () => zonaDeArrastre.classList.remove('dragging'), false);
    });

    zonaDeArrastre.addEventListener('drop', handleDrop, false);
    zonaDeArrastre.addEventListener('click', () => entradaArchivos.click());

    entradaArchivos.addEventListener('change', () => handleFiles(entradaArchivos.files));

    // Prevent defaul para drag and drop events
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Prevenir comportamiento predeterminado para eventos de arrastre y soltados
    function handleDrop(e) {
        const dt = e.dataTransfer;
        handleFiles(dt.files);
    }

    // Procesar y validar archivos
    function handleFiles(files) {
        files = Array.from(files); // Convertir FileList a array

        files.forEach(file => {
            if (validateFile(file)) {
                archivosParaSubir.push(file);
                displayFile(file);
            }
        });

    }

    // Validar archivo
    function validateFile(file) {
        advancedError.textContent = '';
        advancedSuccess.textContent = '';

        const extensionesPermitidas = /(\.pdf|\.doc|\.docx|\.jpg|\.jpeg|\.png)$/i;
        if (!extensionesPermitidas.test(file.name)) {
            advancedError.textContent = 'Archivo no permitido. Solo se permiten .pdf, .doc, .docx, .jpg, .jpeg, y .png.';
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            advancedError.textContent = 'El archivo supera el tamaño máximo de 5MB.';
            return false;
        }

        advancedSuccess.textContent = `Archivo válido: ${file.name}`;
        return true;
    }

    // Mostrar informacion del archivo
    function displayFile(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const div = document.createElement('div');

            div.classList.add('file-info');

            if (file.type.startsWith('image/')) {
                div.innerHTML = `<img src="${e.target.result}" alt="${file.name}" class="preview-image">
                <p>Nombre: ${file.name}</p>
                <p>Tamaño: ${(file.size / 1024).toFixed(2)} KB</p>`;
            } else {
                div.innerHTML = `<p>Nombre: ${file.name}</p>
                <p>Tamaño: ${(file.size / 1024).toFixed(2)} KB</p>`;
            }
            listaArchivos.appendChild(div);
        };
        reader.readAsDataURL(file);
    }

    // Simular subida de archivos
    window.uploadFiles = function() {
        if (archivosParaSubir.length > 0) {
            barraProgreso.style.display = 'block';
            let uploaded = 0;

            archivosParaSubir.forEach((file, index) => {
                setTimeout(() => {
                    uploaded++;
                    barraProgreso.value = (uploaded / archivosParaSubir.length) * 100;
                    if (uploaded === archivosParaSubir.length) {
                        advancedSuccess.textContent = 'Todos los archivos se han subido correctamente.';
                        barraProgreso.style.display = 'none';
                    }
                }, index * 1000); // Simulando subida de archivos
            });
        } else {
            advancedError.textContent = 'No hay archivos para subir.';
        }
    };
});
