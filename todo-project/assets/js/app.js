document.addEventListener('DOMContentLoaded', () => {
  const InputAddTask = document.querySelector('#InputAddTask');
  const ButtonClearStorage = document.querySelector('#ButtonClearStorage');
  const ButtonAddTask = document.querySelector('#ButtonAddTask');
  const ContainerTodoTasks = document.querySelector('#ContainerTodoTasks');
  const ContainerCompleted = document.querySelector('#ContainerCompleted');

  const TitleTodoTasks = document.querySelector('#TitleTodoTasks');
  const TitleCompletedTasks = document.querySelector('#TitleCompletedTasks');
  let numberTask;

  const deleteDefaultLocalStorageData = () => {
    if(localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
    }
    
    if(localStorage.getItem('language')) {
      localStorage.removeItem('language');
    }
  }

  const maxKeyTask = () => {
    let maxNumber = 0;

    for (let i = 0; i < localStorage.length; i++) {
      let key = parseInt(localStorage.key(i));

      if(!isNaN(key) && key > maxNumber) {
        maxNumber = key;
      }
    }

    return maxNumber;
  }

  const TitlesHidden = () => {
    if(ContainerTodoTasks.childElementCount == 0 && ContainerCompleted.childElementCount == 0){
      TitleTodoTasks.style.display = 'none';
    } else {
      TitleTodoTasks.style.display = 'block';
    }
    
    if(ContainerCompleted.childElementCount == 0){
      TitleCompletedTasks.style.display = 'none';
    } else {
      TitleCompletedTasks.style.display = 'block';
    }
  }

  const changeTask = (CheckBox, Input) => {
    if(CheckBox.checked) {
      changeToCompletedTask(Input, CheckBox);
    } else if (!CheckBox.checked) {
      changeToDoTask(Input, CheckBox);
    }
    TitlesHidden();
  }

  const deleteTask = (Button) => {
    Button.parentElement.parentElement.parentElement.parentElement.removeChild(Button.parentElement.parentElement.parentElement)
    localStorage.removeItem(Button.parentElement.parentElement.parentElement.id)

    TitlesHidden();
  }

  const modifyTask = (inputTask, taskContainer) => {
    localStorage.setItem(taskContainer.id, inputTask.value + '-ToDo')
  }

  const deleteAllTasks = () => {
    localStorage.clear();

    while(ContainerTodoTasks.firstChild) {
      ContainerTodoTasks.removeChild(ContainerTodoTasks.firstChild);
    }

    while(ContainerCompleted.firstChild) {
      ContainerCompleted.removeChild(ContainerCompleted.firstChild);
    }
    
    TitlesHidden();
  }

  const changeToCompletedTask = (Input, CheckBox) => {
    CheckBox.checked = true;
    Input.disabled = true;
    ContainerTodoTasks.removeChild(CheckBox.parentElement);
    ContainerCompleted.appendChild(CheckBox.parentElement);
    Input.classList.remove('todo__input-task');
    Input.classList.add('completed__input-task');


    let task = localStorage.getItem(CheckBox.parentElement.id);
    localStorage.setItem(CheckBox.parentElement.id, task.split('-')[0] + '-Completed')
  }

  const changeToDoTask = (Input, CheckBox) => {
    CheckBox.checked = false;
    Input.disabled = false;
    ContainerCompleted.removeChild(CheckBox.parentElement);
    ContainerTodoTasks.appendChild(CheckBox.parentElement);
    Input.classList.remove('completed__input-task');
    Input.classList.add('todo__input-task');

    let task = localStorage.getItem(CheckBox.parentElement.id);
    localStorage.setItem(CheckBox.parentElement.id, task.split('-')[0] + '-ToDo')
  }

  const createNewTask = (value, id) => {
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('wraper-task');

    let inputTask = document.createElement('input');
    inputTask.type = 'text';
    inputTask.classList.add('todo__input-task');
    inputTask.value = value;

    let inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.classList.add('tasks-check', 'inside-options');
    inputCheckbox.checked = false;

    let spanOption = document.createElement('span');
    spanOption.classList.add('material-icons');
    spanOption.innerText = 'more_vert';

    let buttonOptions = document.createElement('button');
    buttonOptions.classList.add('details__button');

    let divOptions =  document.createElement('div');
    divOptions.classList.add('details__container'); 
    
    let buttonDropdownOptions = document.createElement('button');
    buttonDropdownOptions.classList.add('details__option');
    buttonDropdownOptions.innerText = 'Delete';

    let divDropdownOptions =  document.createElement('div');
    divDropdownOptions.classList.add('details__dropdown');

    let Options =  document.createElement('div');
    Options.classList.add('details');
    
    inputTask.addEventListener('focusout', () => {
      modifyTask(inputTask, taskContainer);
    });
    
    inputTask.addEventListener('keypress', (event) => {
      if(event.key === 'Enter') {
        modifyTask(inputTask, taskContainer);
        inputTask.blur();
      }
    });
    
    inputCheckbox.addEventListener('click', () => {
      changeTask(inputCheckbox, inputTask);
    });

    buttonDropdownOptions.addEventListener('click', () => {
      deleteTask(buttonDropdownOptions);
    });
    
    if(id) {
      taskContainer.id = id;
    } else {
      taskContainer.id = numberTask;
    }
    
    divDropdownOptions.appendChild(buttonDropdownOptions);

    buttonOptions.appendChild(spanOption);
    divOptions.appendChild(buttonOptions);

    Options.appendChild(divOptions);
    Options.appendChild(divDropdownOptions);

    taskContainer.appendChild(inputTask);
    taskContainer.appendChild(inputCheckbox);
    taskContainer.appendChild(Options);
    ContainerTodoTasks.appendChild(taskContainer);

    TitlesHidden();
  }

  const extractDataLS = () => {
    // Extraer y crear tareas desde localStorage
    for (let i = 1; i <= localStorage.length; i++) {
      createNewTask(localStorage.getItem(localStorage.key(i - 1)).split('-')[0], localStorage.key(i - 1));
    }

    // Guardar referencias de nodos a mover antes de recorrer
    let ids = Array.from(ContainerTodoTasks.childNodes).filter(task => {
      return task.nodeType === 1 && localStorage.getItem(task.id)?.split('-')[1] === 'Completed';
    });

    // Ahora mover los nodos
    ids.forEach(task => {
      changeToCompletedTask(task.childNodes[0], task.childNodes[1]); 
    });

    TitlesHidden();
  }

  ButtonClearStorage.addEventListener('click', () => { 
    deleteAllTasks();
  });

  ButtonAddTask.addEventListener('click', () => {
    if(InputAddTask.value) {
      document.querySelector('.create__warning').style.display = 'none'
      createNewTask(InputAddTask.value, null);  
      localStorage.setItem(numberTask++, InputAddTask.value + '-ToDo');
      InputAddTask.value = '';
    } else {
      document.querySelector('.create__warning').style.display = 'inline-block'
    }
  });

  InputAddTask.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
      ButtonAddTask.click();
    }
  });

  numberTask = maxKeyTask() + 1;
  deleteDefaultLocalStorageData();
  extractDataLS();
});