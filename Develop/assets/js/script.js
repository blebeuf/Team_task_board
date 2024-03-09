// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskDisplayEl = $('#task-display');
const taskFormEl = $('#task-form');
const taskNameInputEl = $('task-name-input');
const taskDateInputEl = $('taskDueDate');
const taskDescriptionInputEl = $('task-description-input');

const time = dayjs();
function readTasksFromStorage(){
let task = JSON.parse(localStorage.getItem('task'));

$('#taskModal').modal('show');
$('#taskModal').on('shown.bs.modal', function () {
    console.log('Modal is now shown');
    // You can also set focus to a specific element in the modal here
  });

if (!tasks){
    tasks = [];
}
return tasks;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteProject);

// asembling card components   
  taskCard.append(cardHeader, cardBody.append(cardDescription, cardDueDate, cardDeleteBtn));

  return taskCard;
  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const task = readTasksFromStorage();

// Empty existing project cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

// Loop through projects and create project cards for each status
    for (let task of tasks) {
        if (task.status === 'to-do') {
          todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
          inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
          doneList.append(createTaskCard(Task));
        }
    }
    // this is a refenece to the exmaple given in class regarding draggable function within jQuesry
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
          // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });

}

// Todo: create a function to handle adding a new task

function handleAddTask(event){
    event.preventDefault();

      // ? Read user input from the form
  const tasktName = taskNameInputEl.val().trim();
  const taskDescription = taskDescriptionInputEl.val().trim;
  const taskDate = taskDateInputEl.val(); 

  const newTask = {
    name: taskName,
    description: taskDescription,
    dueDate: taskDate,
    status: 'to-do',
  };

  const tasks = readTasksFromStorage();
  projects.push(newTask);

  // ? Print task data back to the screen
  printTaskData();

  
  // ? Clear the form inputs
  taskNameInputEl.val('');
  taskDescriptionInputEl.val('');
  taskDateInputEl.val('');

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage;

    tasks.forEach((task) => {
        tasks.splice(tasks.index.indexOf(task), 1)
    }
)};
saveTasksToStrorage(tasks);
printTasksData();

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.projectId;
    const newStatus = event.target.id;
    for (let project of projects) {
        // ? Find the project card by the `id` and update the project status.
        if (project.id === taskId) {
          project.status = newStatus;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTaskList();
}

taskFormEl.on('submit', handleDeleteProject);

taskDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    printTaskData();

    $('#taskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  
    // Make lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });

});
