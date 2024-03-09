// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const time = dayjs();
function readTasksFromStorage(){
let task = JSON.parse(localStorage.getItem('task'));

if (!tasks){
    tasks = [];
}
return tasks;
}

// Todo: create a function to generate a unique task id
function generateTaskId(event) {
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

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
