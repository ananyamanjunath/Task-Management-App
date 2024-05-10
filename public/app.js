// app.js

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks-list');

    // Fetch all tasks on initial load
    fetchTasks();

    // Event listener for form submission
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;

        const taskData = {
            title,
            description,
            dueDate
        };

        createTask(taskData);
    });

    // Function to fetch all tasks
    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                tasksList.innerHTML = '';
                if (Array.isArray(data)) {
                    data.forEach(task => {
                        const taskElement = document.createElement('li');
                        taskElement.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate})`;
                        taskElement.id = `task-${task._id}`;
                        tasksList.appendChild(taskElement);
                    });
                } else {
                    console.error('Error: Response is not an array');
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }
    
    

    // Function to create a new task
    function createTask(taskData) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task created:', data);
            fetchTasks(); // Refresh the tasks list
        })
        .catch(error => console.error('Error creating task:', error));
    }
});
