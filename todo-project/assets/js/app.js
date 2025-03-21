document.addEventListener('DOMContentLoaded', () => {
  const InputAddTask = document.querySelector('#InputAddTask');
  const ButtonClearStorage = document.querySelector('#ButtonClearStorage');
  const ButtonAddTask = document.querySelector('#ButtonAddTask');
  const ContainerTodoTasks = document.querySelector('#ContainerTodoTasks');
  const ContainerCompletedTasks = document.querySelector('#ContainerCompletedTasks');
  const TitleTodoTasks = document.querySelector('#TitleTodoTasks');
  const TitleCompletedTasks = document.querySelector('#TitleCompletedTasks');
  let taskNumber;

  const titlesHidden = () => {
    ContainerTodoTasks.childElementCount == 0 && ContainerCompletedTasks.childElementCount == 0 ? TitleTodoTasks.style.display = 'none' : TitleTodoTasks.style.display = 'block';
    ContainerCompletedTasks.childElementCount == 0 ? TitleCompletedTasks.style.display = 'none' : TitleCompletedTasks.style.display = 'block';
  }

  const changeTask = (taskCheckBox, taskInput, newTask) => {
    let parent = taskCheckBox.parentElement;
    taskInput.disabled = taskCheckBox.checked;

    if(taskCheckBox.checked) {
      ContainerTodoTasks.removeChild(parent);
      ContainerCompletedTasks.appendChild(parent);
    } else {
      ContainerCompletedTasks.removeChild(parent);
      ContainerTodoTasks.appendChild(parent);
    }

    taskInput.classList.toggle('completed__input-task');
    
    let task = localStorage.getItem(parent.id);
    if(task) {
      let [taskText, taskLevel] = task.split('-');
      newTask ? taskLevel = taskLevel === 'ToDo' ? 'Completed' : 'ToDo' : taskLevel = 'Completed';
      localStorage.setItem(parent.id, `${taskText}-${taskLevel}`);
    }
    titlesHidden();
  }
  
  const deleteAllTasks = () => {
    localStorage.clear();
    while(ContainerTodoTasks.firstChild) ContainerTodoTasks.removeChild(ContainerTodoTasks.firstChild);
    while(ContainerCompletedTasks.firstChild) ContainerCompletedTasks.removeChild(ContainerCompletedTasks.firstChild);
    titlesHidden();
  }

  const deleteTask = (taskContainer, task) => {
    taskContainer.removeChild(task)
    localStorage.removeItem(task.id)
    titlesHidden();
  }

  const modifyTask = (taskInput, taskContainer, taskWarning) => {
    if(taskInput.value) {
      taskWarning.style.display = 'none';
      taskContainer.style.marginBottom = '0';
      localStorage.setItem(taskContainer.id, taskInput.value + '-ToDo');
    } else {
      taskWarning.style.display = 'inline-block';
      taskContainer.style.marginBottom = '30px';
    }
  }

  const newTask = (value, id) => {
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('wraper-task');

    let taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.classList.add('tasks-input');
    taskInput.value = value;
    taskInput.id = 'TaskModify';
    taskInput.name = 'TaskModify';

    let taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.classList.add('tasks-check', 'inside-options');
    taskCheckBox.checked = false;

    let detailsContainer =  document.createElement('div');
    detailsContainer.classList.add('details');
    
    let detailsContent =  document.createElement('div');
    detailsContent.classList.add('details__container'); 
    
    let detailsButton = document.createElement('button');
    detailsButton.classList.add('details__button');

    let detailsIcon = document.createElement('span');
    detailsIcon.classList.add('material-icons');
    detailsIcon.innerText = 'more_vert';
    
    let detailsDropdown =  document.createElement('div');
    detailsDropdown.classList.add('details__dropdown');

    let detailsOption = document.createElement('button');
    detailsOption.classList.add('details__option');
    detailsOption.innerText = 'Delete';

    let taskWarning = document.createElement('label');
    taskWarning.classList.add('warning-text');
    taskWarning.for = 'TaskModify';
    taskWarning.innerText = 'It cannot be empty!';
    
    taskInput.addEventListener('focusout', () => modifyTask(taskInput, taskContainer, taskWarning));
    taskInput.addEventListener('keypress', (event) => {
      if(event.key === 'Enter') {
        modifyTask(taskInput, taskContainer, taskWarning);
        taskInput.blur();
      }
    });
    taskCheckBox.addEventListener('click', () => changeTask(taskCheckBox, taskInput, true));
    detailsOption.addEventListener('click', () => deleteTask(taskContainer.parentElement, taskContainer));
    
    id ? taskContainer.id = id : taskContainer.id = taskNumber;
    
    detailsButton.appendChild(detailsIcon);
    detailsDropdown.appendChild(detailsOption);
    detailsContent.appendChild(detailsButton);
    detailsContainer.appendChild(detailsContent);
    detailsContainer.appendChild(detailsDropdown);
    taskContainer.appendChild(taskInput);
    taskContainer.appendChild(taskCheckBox);
    taskContainer.appendChild(detailsContainer);
    taskContainer.appendChild(taskWarning);
    ContainerTodoTasks.appendChild(taskContainer);

    titlesHidden();
  }
  
  ButtonClearStorage.addEventListener('click', () => deleteAllTasks());
  
  ButtonAddTask.addEventListener('click', () => {
    if(InputAddTask.value) {
      document.querySelector('#WarningEmptyTask').style.display = 'none'
      newTask(InputAddTask.value, null);  
      localStorage.setItem(taskNumber++, InputAddTask.value + '-ToDo');
      InputAddTask.value = '';
    } else {
      document.querySelector('#WarningEmptyTask').style.display = 'inline-block'
    }
  });
  
  InputAddTask.addEventListener('keypress', (event) => event.key === 'Enter' ? ButtonAddTask.click() : null);

  const deleteDefaultDataLS = () => {
    localStorage.getItem('theme') != null ? localStorage.removeItem('theme') : null;
    localStorage.getItem('language') != null ?localStorage.removeItem('language') : null
  }

  const maxKeyTask = () => {
    let maxNumber = 0;

    for (let i = 0; i < localStorage.length; i++) {
      let key = parseInt(localStorage.key(i));
      if(!isNaN(key) && key > maxNumber) maxNumber = key;
    }

    return maxNumber;
  }

  const extractDataLS = () => {
    taskNumber = maxKeyTask() + 1;
    deleteDefaultDataLS();

    for (let i = 1; i <= localStorage.length; i++) {
      newTask(localStorage.getItem(localStorage.key(i - 1)).split('-')[0], localStorage.key(i - 1));
    }

    let ids = Array.from(ContainerTodoTasks.childNodes).filter(task => {
      return task.nodeType === 1 && localStorage.getItem(task.id)?.split('-')[1] === 'Completed';
    });

    ids.forEach(task => {
      task.childNodes[1].checked = true;
      changeTask(task.childNodes[1], task.childNodes[0], false);
    });

    titlesHidden();
  }

  extractDataLS();
});