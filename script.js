document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateProgress();
});

// Add Task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('priorityLevel').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.dataset.category = category;
    li.innerHTML = `
        <input type="checkbox" onchange="toggleComplete(this)">
        <span>${taskInput.value}</span>
        <small class="category-tag ${category}">${category}</small>
        <small class="priority ${priority}">${priority}</small>
        <small>${dueDate}</small>
        <button class="edit-btn" onclick="editTask(this)">✏️ Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">🗑️ Delete</button>
    `;

    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
    triggerConfetti();
    updateProgress();
}

// Toggle Complete
function toggleComplete(checkbox) {
    const li = checkbox.closest('li');
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) {
        triggerConfetti();
    }
    saveTasks();
    updateProgress();
}

// Delete Task
function deleteTask(button) {
    const li = button.closest('li');
    li.remove();
    saveTasks();
    updateProgress();
}

// Edit Task
function editTask(button) {
    const li = button.closest('li');
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasks();
    }
}

// Confetti Effect
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Update Progress
function updateProgress() {
    const tasks = document.querySelectorAll('li');
    const completedTasks = document.querySelectorAll('li.completed').length;
    const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    document.querySelector('.progress-fill').style.width = progress + '%';
}

// Save & Load Tasks
function saveTasks() { /* (Same as before) */ }
function loadTasks() { /* (Same as before) */ }
