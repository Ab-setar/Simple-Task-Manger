let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const toggleBtn = document.getElementById('toggle-dark');

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.title;

    const finishBtn = document.createElement('button');
    finishBtn.textContent = task.completed ? 'Undo' : 'Finish';
    finishBtn.className = 'finish-btn';
    finishBtn.onclick = () => toggleCompleted(task.id);

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'update-btn';
    updateBtn.onclick = () => updateTask(task.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(finishBtn);
    li.appendChild(updateBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add task
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

// Toggle complete
function toggleCompleted(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Update task
function updateTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt('Update your task:', task.title);
  if (newTitle !== null && newTitle.trim() !== '') {
    task.title = newTitle.trim();
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

// Dark mode logic
function updateToggleIcon() {
  toggleBtn.textContent = document.body.classList.contains('dark')
    ? '🌞 Light Mode'
    : '🌙 Dark Mode';
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
updateToggleIcon();

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
  updateToggleIcon();
});

// Initial render
renderTasks();