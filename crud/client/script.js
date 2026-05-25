const API_URL = 'http://localhost:3001/todos';

const messageForm = document.getElementById('messageForm');
const userNameInput = document.getElementById('userName');
const userMessageInput = document.getElementById('userMessage');
const submitBtn = document.getElementById('submitBtn');
const userNameError = document.getElementById('userNameError');
const userMessageError = document.getElementById('userMessageError');
const messagesContainer = document.getElementById('messagesContainer');
const emptyState = document.getElementById('emptyState');
const messageCount = document.getElementById('messageCount');

let localTasks = [];

function fetchTasks() {
    console.log('--- READ ---');
    console.log('GET ' + API_URL + '?_limit=5');

    fetch(API_URL + '?_limit=5')
        .then(response => {
            console.log('Respuesta:', response.status);
            if (!response.ok) throw new Error('Error al obtener tareas');
            return response.json();
        })
        .then(data => {
            console.log('Datos:', data);

            localTasks = data.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed
            }));

            renderTasks();
        })
        .catch(error => console.error('Error en fetchTasks:', error));
}

function createTask(title, description) {
    console.log('--- CREATE ---');
    console.log('POST ' + API_URL);

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: false,
            userId: 1
        })
    })
        .then(response => {
            console.log('Respuesta:', response.status);
            if (!response.ok) throw new Error('Error al crear tarea');
            return response.json();
        })
        .then(data => {
            console.log('Creada en DB:', data);

            localTasks.unshift({
                id: data.id,
                title: title,
                description: description || 'Sin descripcion',
                completed: false
            });

            renderTasks();
        })
        .catch(error => console.error('Error en createTask:', error));
}

function updateTask(id) {
    console.log('--- UPDATE ---');
    console.log('ID:', id);

    const task = localTasks.find(t => t.id === id);
    if (!task) {
        console.error('Tarea no encontrada en localTasks');
        return;
    }

    const newTitle = prompt('Nuevo titulo:', task.title);
    if (newTitle === null) return;

    const trimmedTitle = newTitle.trim();
    if (trimmedTitle === '') {
        alert('El titulo no puede estar vacio.');
        return;
    }

    const newDesc = prompt('Nueva descripcion:', task.description);
    if (newDesc === null) return;

    const trimmedDesc = newDesc.trim();

    const dataToSend = {
        title: trimmedTitle,
        description: trimmedDesc
    };

    console.log('PATCH ' + API_URL + '/' + id);
    console.log('Datos:', JSON.stringify(dataToSend));

    fetch(API_URL + '/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            console.log('Respuesta:', response.status);
            if (!response.ok) throw new Error('Error al actualizar tarea');
            return response.json();
        })
        .then(data => {
            console.log('Actualizada en DB:', data);

            task.title = trimmedTitle;
            task.description = trimmedDesc;
            renderTasks();
        })
        .catch(error => console.error('Error en updateTask:', error));
}

function deleteTask(id) {
    console.log('--- DELETE ---');
    console.log('DELETE ' + API_URL + '/' + id);

    fetch(API_URL + '/' + id, {
        method: 'DELETE'
    })
        .then(response => {
            console.log('Respuesta:', response.status);
            if (!response.ok) throw new Error('Error al eliminar tarea');

            localTasks = localTasks.filter(t => t.id !== id);
            renderTasks();
        })
        .catch(error => console.error('Error en deleteTask:', error));
}

function validateForm() {
    let isValid = true;

    const title = userNameInput.value.trim();
    if (title === '') {
        userNameError.textContent = 'El titulo es obligatorio';
        userNameInput.classList.add('error');
        isValid = false;
    } else {
        userNameError.textContent = '';
        userNameInput.classList.remove('error');
    }

    const message = userMessageInput.value.trim();
    if (message === '') {
        userMessageError.textContent = 'La descripcion es obligatoria';
        userMessageInput.classList.add('error');
        isValid = false;
    } else {
        userMessageError.textContent = '';
        userMessageInput.classList.remove('error');
    }

    return isValid;
}

function createCard(task) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.dataset.id = task.id;

    const header = document.createElement('div');
    header.className = 'message-card__header';

    const userDiv = document.createElement('div');
    userDiv.className = 'message-card__user';

    const avatar = document.createElement('div');
    avatar.className = 'message-card__avatar';
    avatar.textContent = task.title.charAt(0).toUpperCase();

    const infoDiv = document.createElement('div');

    const username = document.createElement('div');
    username.className = 'message-card__username';
    username.textContent = task.title;

    const timestamp = document.createElement('div');
    timestamp.className = 'message-card__timestamp';
    timestamp.textContent = 'ID: ' + task.id;

    infoDiv.appendChild(username);
    infoDiv.appendChild(timestamp);

    userDiv.appendChild(avatar);
    userDiv.appendChild(infoDiv);

    const actions = document.createElement('div');
    actions.className = 'message-card__actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn--edit';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', function () {
        updateTask(task.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn--delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', function () {
        deleteTask(task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    header.appendChild(userDiv);
    header.appendChild(actions);

    const content = document.createElement('div');
    content.className = 'message-card__content';
    content.textContent = task.description || 'Sin descripcion';

    card.appendChild(header);
    card.appendChild(content);

    return card;
}

function renderTasks() {
    messagesContainer.innerHTML = '';

    if (localTasks.length === 0) {
        emptyState.classList.remove('hidden');
        messageCount.textContent = '0 Tareas';
        return;
    }

    emptyState.classList.add('hidden');
    messageCount.textContent = localTasks.length + ' Tareas';

    localTasks.forEach(task => {
        messagesContainer.appendChild(createCard(task));
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const title = userNameInput.value.trim();
    const description = userMessageInput.value.trim();

    createTask(title, description);

    messageForm.reset();
    userNameInput.focus();
}

messageForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', function () {
    console.log('Gestor de Tareas iniciado');
    console.log('  CREATE -> POST');
    console.log('  READ   -> GET');
    console.log('  UPDATE -> PATCH');
    console.log('  DELETE -> DELETE');
    console.log('');

    fetchTasks();
});
