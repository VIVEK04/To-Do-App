document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = createTaskItem(taskText);
        pendingTasksList.appendChild(taskItem);
        taskInput.value = '';
    };

    // Function to create a task item
    const createTaskItem = (taskText, isCompleted = false) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(li));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(li, isCompleted));

        const completeButton = document.createElement('button');
        completeButton.textContent = isCompleted ? 'Unmark' : 'Complete';
        completeButton.addEventListener('click', () => toggleTaskCompletion(li, taskText, isCompleted));

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(completeButton);

        return li;
    };

    // Function to edit a task
    const editTask = (taskItem) => {
        const span = taskItem.querySelector('span');
        const newTaskText = prompt('Edit your task', span.textContent);
        if (newTaskText !== null) {
            span.textContent = newTaskText;
        }
    };

    // Function to delete a task
    const deleteTask = (taskItem, isCompleted) => {
        taskItem.remove();
        if (isCompleted) {
            completedTasksList.removeChild(taskItem);
        } else {
            pendingTasksList.removeChild(taskItem);
        }
    };

    // Function to toggle task completion
    const toggleTaskCompletion = (taskItem, taskText, isCompleted) => {
        taskItem.remove();
        if (isCompleted) {
            const newTaskItem = createTaskItem(taskText, false);
            pendingTasksList.appendChild(newTaskItem);
        } else {
            const newTaskItem = createTaskItem(taskText, true);
            completedTasksList.appendChild(newTaskItem);
        }
    };

    // Event listener for adding a task
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});
