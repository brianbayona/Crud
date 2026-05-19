/**
 * ============================================
 * ACTIVIDAD: CICLO COMPLETO DE UN CRUD
 * ============================================
 * 
 * Objetivo: Identificar el ciclo de vida de un CRUD conectándose a una API.
 * Autor: Brian Mauricio Bayona Ravelo
 * ============================================
 */

// URL base de la API de prueba (JSONPlaceholder)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================
const messageForm = document.getElementById('messageForm');
const userNameInput = document.getElementById('userName'); // Lo usaremos como Título de la tarea
const userMessageInput = document.getElementById('userMessage'); // Lo usaremos como Descripción
const submitBtn = document.getElementById('submitBtn');

const userNameError = document.getElementById('userNameError');
const userMessageError = document.getElementById('userMessageError');

const messagesContainer = document.getElementById('messagesContainer');
const emptyState = document.getElementById('emptyState');
const messageCount = document.getElementById('messageCount');

// Array local para manejar las tareas en la memoria del navegador
let localTasks = [];


// ============================================
// 2. FUNCIONES DE COMUNICACIÓN CON LA API (CRUD)
// ============================================

/**
 * READ: Obtiene las primeras 5 tareas de la API al cargar la página.
 * Pista: Usa fetch(`${API_URL}?_limit=5`), verifica la respuesta con un 
 * console.log y luego guarda el resultado para renderizarlo.
 */
function fetchTasks() {
    // TODO: Implementar petición GET a la API
}

/**
 * CREATE: Envía una nueva tarea al servidor usando el método POST.
 * @param {string} title - El título de la tarea obtenido del input
 * @param {string} description - La descripción de la tarea obtenida del textarea
 */
function createTask(title, description) {
    // TODO: Implementar petición POST
    // Pista: Recuerda enviar el método, los headers y el body convertido a JSON.stringify()
    // Al recibir la respuesta del servidor, añade la tarea a 'localTasks' y vuelve a listar.
}

/**
 * UPDATE: Modifica el título de una tarea específica mediante PUT o PATCH.
 * @param {number} id - El identificador único de la tarea a modificar
 */
function updateTask(id) {
    // TODO: Implementar petición PATCH o PUT
    // Pista 1: Usa un prompt() para pedirle al usuario el nuevo nombre.
    // Pista 2: La URL de destino debe incluir el id (ej: `${API_URL}/${id}`).
    // Al recibir confirmación de la API, actualiza el array local y refresca el DOM.
}

/**
 * DELETE: Elimina una tarea del servidor y de la interfaz.
 * @param {number} id - El identificador único de la tarea a eliminar
 */
function deleteTask(id) {
    // TODO: Implementar petición DELETE
    // Pista: Envía la petición fetch a la URL con el id y especifica el método 'DELETE'.
    // Tras la respuesta exitosa, saca el elemento de 'localTasks' y vuelve a listar.
}


// ============================================
// 3. FUNCIONES AUXILIARES Y MANIPULACIÓN DEL DOM
// ============================================

/**
 * Valida que los campos obligatorios del formulario no estén vacíos
 * @returns {boolean} - true si es válido, false si no
 */
function validateForm() {
    // TODO: Validar que userNameInput (Título) no esté vacío
    // Si está vacío, mostrar el error en userNameError y retornar false.
}

/**
 * Dibuja las tareas guardadas en 'localTasks' dentro del contenedor HTML.
 * Nota: Aquí es donde los datos se transforman en elementos del DOM.
 */
function renderTasks() {
    // 1. Limpiar el contenedor de mensajes (messagesContainer.innerHTML = '')
    // 2. Evaluar si localTasks está vacío para mostrar u ocultar el 'emptyState'
    // 3. Recorrer 'localTasks' con un forEach.
    // 4. Por cada tarea, crear la estructura HTML e inyectarla.
    
    // Pista para los botones de acción dentro del bucle:
    // Agrega los atributos onclick="updateTask(${task.id})" y onclick="deleteTask(${task.id})"
    
    // 5. Actualizar el contador visual (messageCount)
}


// ============================================
// 4. MANEJO Y REGISTRO DE EVENTOS
// ============================================

/**
 * Maneja el envío del formulario para crear una tarea
 * @param {Event} event - Evento del formulario
 */
function handleFormSubmit(event) {
    // TODO: Implementar el manejador
    // 1. Prevenir comportamiento por defecto (preventDefault)
    // 2. Validar el formulario
    // 3. Obtener valores de los inputs
    // 4. Llamar a createTask() pasando los datos
    // 5. Limpiar el formulario con messageForm.reset()
}

// Registro de Eventos
messageForm.addEventListener('submit', handleFormSubmit);


// ============================================
// 5. INICIALIZACIÓN
// ============================================

/**
 * Ejecuta la carga inicial de datos una vez el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM completamente cargado');
    
    // TODO: Llamar a la función que trae las tareas de la API para arrancar la app
});