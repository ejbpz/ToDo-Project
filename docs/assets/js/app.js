document.addEventListener('DOMContentLoaded', () => {
  const TodoTask = document.querySelector('#TodoTask');
  const ClearStorage = document.querySelector('#ClearStorage');
  const ButtonAddTask = document.querySelector('#ButtonAddTask');
  const ContainerTodo = document.querySelector('#ContainerTodo');
  const ContainerCompleted = document.querySelector('#ContainerCompleted');

  const TitleTodo = document.querySelector('#TitleTodo');
  const TitleCompleted = document.querySelector('#TitleCompleted');
  let numberTask;

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
    if(ContainerTodo.childElementCount == 0 && ContainerCompleted.childElementCount == 0){
      TitleTodo.hidden = true;
    } else {
      TitleTodo.hidden = false;
    }
    
    if(ContainerCompleted.childElementCount == 0){
      TitleCompleted.hidden = true;
    } else {
      TitleCompleted.hidden = false;
    }
  }

  const changeTask = (CheckBox, Input) => {
    if(CheckBox.checked) {
      changeToCompletedTask(Input, CheckBox);
    } else if (!CheckBox.checked) {
      changeToDoTask(Input, CheckBox);
    }
    TitlesHidden();
  };

  const deleteTask = (Button) => {
    Button.parentElement.parentElement.parentElement.parentElement.removeChild(Button.parentElement.parentElement.parentElement)
    localStorage.removeItem(Button.parentElement.parentElement.parentElement.id)

    TitlesHidden();
  }

  const modifyTask = (inputTask, taskContainer) => {
    localStorage.setItem(taskContainer.id, inputTask.value + '-ToDO')
  }

  const changeToCompletedTask = (Input, CheckBox) => {
    CheckBox.checked = true;
    Input.disabled = true;
    ContainerTodo.removeChild(CheckBox.parentElement);
    ContainerCompleted.appendChild(CheckBox.parentElement);
    CheckBox.classList.remove('main__check-task');
    CheckBox.classList.add('main__check-completed');
    Input.classList.remove('main__task');
    Input.classList.add('main__task-completed');


    let task = localStorage.getItem(CheckBox.parentElement.id);
    localStorage.setItem(CheckBox.parentElement.id, task.split('-')[0] + '-Completed')
  };

  const changeToDoTask = (Input, CheckBox) => {
    CheckBox.checked = false;
    Input.disabled = false;
    ContainerCompleted.removeChild(CheckBox.parentElement);
    ContainerTodo.appendChild(CheckBox.parentElement);
    CheckBox.classList.remove('main__check-completed');
    CheckBox.classList.add('main__check-task');
    Input.classList.remove('main__task-completed');
    Input.classList.add('main__task');

    let task = localStorage.getItem(CheckBox.parentElement.id);
    localStorage.setItem(CheckBox.parentElement.id, task.split('-')[0] + '-ToDo')
  };

  const createNewTask = (value, id) => {
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('main__wrap-task');

    let inputTask = document.createElement('input');
    inputTask.type = 'text';
    inputTask.classList.add('main__task');
    inputTask.value = value;

    let inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.classList.add('main__check-task', 'tasks');
    inputCheckbox.checked = false;

    let spanOption = document.createElement('span');
    spanOption.classList.add('material-icons');
    spanOption.innerText = 'more_vert';

    let buttonOptions = document.createElement('button');
    buttonOptions.classList.add('main__options');

    let divOptions =  document.createElement('div');
    divOptions.classList.add('options__dropdown'); 
    
    let buttonDropdownOptions = document.createElement('button');
    buttonDropdownOptions.classList.add('dropdown__delete');
    buttonDropdownOptions.innerText = 'Delete';

    let divDropdownOptions =  document.createElement('div');
    divDropdownOptions.classList.add('main__dropdown-options');

    let Options =  document.createElement('div');
    Options.classList.add('options');
    
    inputTask.addEventListener('focusout', () => {
      modifyTask(inputTask, taskContainer);
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
    ContainerTodo.appendChild(taskContainer);

    TitlesHidden();
  }

  const extractDataLS = () => {
    // Extraer y crear tareas desde localStorage
    for (let i = 1; i <= localStorage.length; i++) {
      createNewTask(localStorage.getItem(localStorage.key(i - 1)).split('-')[0], localStorage.key(i - 1));
    }

    // Guardar referencias de nodos a mover antes de recorrer
    let ids = Array.from(ContainerTodo.childNodes).filter(task => {
      return task.nodeType === 1 && localStorage.getItem(task.id)?.split('-')[1] === 'Completed';
    });

    // Ahora mover los nodos
    ids.forEach(task => {
      changeToCompletedTask(task.childNodes[0], task.childNodes[1]); 
    });

    TitlesHidden();
  };

  ClearStorage.addEventListener('click', () => { 
    localStorage.clear();

    while(ContainerTodo.firstChild) {
      ContainerTodo.removeChild(ContainerTodo.firstChild);
    }

    while(ContainerCompleted.firstChild) {
      ContainerCompleted.removeChild(ContainerCompleted.firstChild);
    }
    
    TitlesHidden();
  });

  ButtonAddTask.addEventListener('click', () => {
    if(TodoTask.value) {
      createNewTask(TodoTask.value, null);  
      localStorage.setItem(numberTask++, TodoTask.value + '-ToDo');
      TodoTask.value = '';
    }
  });

  numberTask = maxKeyTask() + 1;
  console.log(numberTask);
  
  extractDataLS();
});