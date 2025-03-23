export const titlesHidden = (ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks) => {
  ContainerTodoTasks.childElementCount == 0 && ContainerCompletedTasks.childElementCount == 0 ? TitleTodoTasks.style.display = 'none' : TitleTodoTasks.style.display = 'block';
  ContainerCompletedTasks.childElementCount == 0 ? TitleCompletedTasks.style.display = 'none' : TitleCompletedTasks.style.display = 'block';
}

export const newTask = (value, id, modifyTask, changeTask, deleteTask, ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks) => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('wraper-task');

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.classList.add('tasks-input');
  taskInput.value = value;
  taskInput.id = 'TaskModify';
  taskInput.name = 'TaskModify';

  const taskCheckBox = document.createElement('input');
  taskCheckBox.type = 'checkbox';
  taskCheckBox.classList.add('tasks-check', 'inside-options');
  taskCheckBox.checked = false;

  const detailsContainer =  document.createElement('div');
  detailsContainer.classList.add('details');
  
  const detailsContent =  document.createElement('div');
  detailsContent.classList.add('details__container'); 
  
  const detailsButton = document.createElement('button');
  detailsButton.classList.add('details__button');

  const detailsIcon = document.createElement('span');
  detailsIcon.classList.add('material-icons');
  detailsIcon.innerText = 'more_vert';
  
  const detailsDropdown =  document.createElement('div');
  detailsDropdown.classList.add('details__dropdown');

  const detailsOption = document.createElement('button');
  detailsOption.classList.add('details__option');
  detailsOption.innerText = 'Delete';

  const taskWarning = document.createElement('label');
  taskWarning.classList.add('warning-text');
  taskWarning.for = 'TaskModify';
  taskWarning.innerText = 'It cannot be empty!';
  
  taskContainer.id = id;

  taskInput.addEventListener('focusout', () => {
    modifyTask(taskInput.value, taskContainer, taskWarning)
    titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);
  });

  taskInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      modifyTask(taskInput.value, taskContainer, taskWarning);
      taskInput.blur();
      titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);
        }
  });

  taskCheckBox.addEventListener('click', () => {
    changeTask(taskCheckBox, taskInput, true)
    titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);
  });

  detailsOption.addEventListener('click', () => {
    deleteTask(taskContainer.parentElement, taskContainer)
    titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);
  });


  detailsButton.appendChild(detailsIcon);
  detailsDropdown.appendChild(detailsOption);
  detailsContent.appendChild(detailsButton);
  detailsContainer.appendChild(detailsContent);
  detailsContainer.appendChild(detailsDropdown);
  taskContainer.appendChild(taskInput);
  taskContainer.appendChild(taskCheckBox);
  taskContainer.appendChild(detailsContainer);
  taskContainer.appendChild(taskWarning);

  titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);

  return taskContainer;
}