const addBtn = document.getElementById('addTask');
const pendingDiv = document.querySelector('.pending');
const doneDiv = document.querySelector('.done');

// Create an array to store the task objects
const tasks = [];

addBtn.addEventListener("click", function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('discription').value;
    const projectHolder = document.getElementById('projct_holder').value;

    const task = {
        title: title,
        description: description,
        projectHolder: projectHolder,
        completed: false, // Initialize as not completed
    };

    tasks.push(task); // Add the task object to the tasks array

    renderTasks(); // Render all tasks

    document.getElementById('title').value = '';
    document.getElementById('discription').value = '';
    document.getElementById('projct_holder').value = '';
});

function renderTasks() {
    // Clear the displayDiv before re-rendering tasks
    pendingDiv.innerHTML = '';
    doneDiv.innerHTML = '';

    tasks.forEach(function (task, index) {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed-task' : ''}`;

        const output = `<div class="taskDiv">
            <div class="task-header">
                <input type="text" class="title1 displayContent" value="${task.title}" readonly>
                <p class="status" style="margin-top: 0px;">${task.completed ? '<i class="fas fa-check"></i> done' : "pending"}</p>
             </div>
            <input type="text" class="holdername displayContent" style="margin-top: 0px;margin-bottom: 0px;" value="${task.projectHolder}" readonly>
            <div style="display:flex; width:100%">
                <p class="pd">Project Description:</p>
                <input type="text" class="desc displayContent" value=" ${task.description}" readonly>
            </div>
            <input type="checkbox" class="task-checkbox checkbox custom-checkbox" ${task.completed ? 'checked' : ''} ${task.completed ? 'disabled' : ''}>            <span class="icon"></span>
            <span class="text"><b>${task.completed ? 'Done' : 'Done?'}</b></span><br>
            <div style="margin-left:20px; margin-top:10px;">
                <button class="edit-button">Edit task</button>
                <button class="delete-button">Delete Task</button>
            </div>
        </div>`;

        taskElement.innerHTML = output;
        const statusElement =taskElement.querySelector(".status");

        // Add the task element to your container (e.g., pendingDiv or doneDiv)
        if (task.completed) {
            doneDiv.appendChild(taskElement);
            statusElement.style.backgroundColor = "green";
            statusElement.style.color = "white";
        } else {
            pendingDiv.appendChild(taskElement);
        }

        const editButton = taskElement.querySelector('.edit-button');
        const saveButton = taskElement.querySelector('.edit-button');
        const titleInput = taskElement.querySelector('.title1');
        const nameInput = taskElement.querySelector('.holdername');
        const statusInput = taskElement.querySelector('.status');
        const descriptionInput = taskElement.querySelector('.desc');
        const checkbox = taskElement.querySelector('.task-checkbox');

        editButton.addEventListener('click', function () {
            if (editButton.textContent === 'Edit task') {
                // User wants to edit, so change to save mode
                editButton.textContent = 'Save';
                editButton.style.backgroundColor="blue";
                titleInput.readOnly = false;
                nameInput.readOnly = false;
                statusInput.readOnly = false;
                descriptionInput.readOnly = false;
                checkbox.disabled=false;
            } else {
                // User wants to save
                editButton.textContent = 'Edit task';
                titleInput.readOnly = true;
                nameInput.readOnly = true;
                statusInput.readOnly = true;
                descriptionInput.readOnly = true;
                task.title = titleInput.value;
                task.completed = statusInput.value === 'Done';
                task.description = descriptionInput.value;
                checkbox.classList.add('disable-checkbox'); // Add the class to disable pointer-events
            }
        });

        checkbox.addEventListener('change', function () {
            task.completed = this.checked;
            renderTasks(); // Re-render tasks to reflect the changes
        });

        const deleteButton = taskElement.querySelector('.delete-button');
        deleteButton.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task?")) {
                // Remove the task from the tasks array
                tasks.splice(index, 1);
                // Re-render the tasks to reflect the deletion
                renderTasks();
            }
        });
    });
}

// Initial rendering of tasks
renderTasks();