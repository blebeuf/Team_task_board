// Retrieve tasks and nextId from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

const taskFormEl = $('#taskForm');
const taskDisplayEl = $('#task-display');
const taskNameInputEl = $('#taskName');
const taskDescriptionInputEl = $('#taskDescription');
const taskDateInputEl = $('#taskDueDate');

// This function is for checking localStorage for an existing task list (array), if none exist, this creates one
function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) {
        tasks = [];
    }
    return tasks;
}

// This function is for storing the task data to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
// Updated createTaskCard function with corrected button class for event listener binding
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card project-card draggable my-3').attr('data-task-id', task.id.toString()); // Ensure task.id is a string
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text('Due Date: ' + task.dueDate);
    const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete-task').text('Delete').attr('data-task-id', task.id.toString()); // Ensure task.id is a string

    cardDeleteBtn.on('click', handleDeleteTask);

    taskCard.append(cardHeader, cardBody.append(cardDescription, cardDueDate, cardDeleteBtn));

    return taskCard;
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();
    // Empties any existing lists
    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgList = $('#in-progress-cards');
    inProgList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

// Loop through projects and create project cards for each status

    for (let task of tasks) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
// this is a refenece to the exmaple given in class regarding draggable function within jQuesry
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable') ?
                $(e.target) :
                $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    // Reads user input
    const taskName = taskNameInputEl.val().trim();
    const taskDescription = taskDescriptionInputEl.val().trim();
    const taskDueDate = taskDateInputEl.val();

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        status: 'to-do',
    };
    // Pulls tasks from localStorage and pushes the new task to the array
    const tasks = readTasksFromStorage();
    tasks.push(newTask);
    // Saves updated tasks array to localStorage
    saveTasksToStorage(tasks);
    // Print tasks to the page
    renderTaskList();
    // Clears input values if needed
    taskNameInputEl.val('');
    taskDescriptionInputEl.val('');
    taskDateInputEl.val('');
    $('#formModal').modal('hide');
}

// taskDisplayEl.on('click', '.delete-task', handleDeleteTask); 

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = parseInt($(this).attr('data-task-id')); // Convert taskId back to integer
    let tasks = readTasksFromStorage(); // Call as a function

    // Remove the task from the array
    tasks = tasks.filter((task) => task.id !== taskId); // Use !== for strict comparison

    saveTasksToStorage(tasks);
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const draggedTaskId = ui.helper.attr('data-task-id');
    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id == draggedTaskId) {
            task.status = newStatus;
        }
    }

    saveTasksToStorage(tasks);
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});

taskFormEl.on('submit', handleAddTask);

taskDisplayEl.on('click', '.delete-task', handleDeleteTask); 
