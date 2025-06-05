// Hardcoded initial tasks array
let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');

// Render tasks in the UI
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.title;
    span.onclick = () => toggleCompleted(task.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const title = newTaskInput.value.trim();
  if (title === '') {
    alert('Task title cannot be empty!');
    return;
  }
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  newTaskInput.value = '';
  renderTasks();
}

// Toggle task completed
function toggleCompleted(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initial render
renderTasks();