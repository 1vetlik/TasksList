const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
let todos = [];

// Ініціалізація додатку: завантажуємо справи з localStorage при старті
function init() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    render();
    updateCounter();
}

// Функція для збереження списку справ у localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
    const text = prompt('Enter the new task:');
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTask);
        saveTodos();  // Зберігаємо список справ після додавання нової справи
        render();
        updateCounter();
    }
}

function renderTodo(todo) {
    const { id, text, completed } = todo;
    return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="todo-${id}" ${completed ? 'checked' : ''} onclick="checkTodo(${id})">
            <label for="todo-${id}">
                <span class="${completed ? 'text-success text-decoration-line-through' : ''}">${text}</span>
            </label>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${id})">delete</button>
        </li>
    `;
}

function render() {
    list.innerHTML = '';
    todos.forEach(todo => {
        list.insertAdjacentHTML('beforeend', renderTodo(todo));
    });
}

function updateCounter() {
    const total = todos.length;
    const uncheckedCount = todos.filter(todo => !todo.completed).length;
    
    itemCountSpan.textContent = total;
    uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();  // Зберігаємо зміни після видалення справи
    render();
    updateCounter();
}

function checkTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();  // Зберігаємо зміни після оновлення статусу виконання
    render();
    updateCounter();
}

// Викликаємо init при завантаженні сторінки
init();
