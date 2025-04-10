import tasksStorage from '@/store/tasks-storage';
import { createTask, modifyTask } from '@/use-cases/save-task';
import { deleteTask } from '@/use-cases/delete-task';
import { validateInput } from '@/validators/validateInput';
import { changeTask } from '@/use-cases/cange-task';

export const newTask = (id, value, divTodo, divComp, callback) => {
  const lang = tasksStorage.getLangLS();

  const container = document.createElement('div');
  container.id = id || tasksStorage.getHigherIdTaskLS() + 1;
  container.classList.add('wraper-task');

  const input = document.createElement('input');
  input.classList.add('tasks-input');
  input.name = 'TaskModify';
  input.id = 'TaskModify';
  input.value = value;
  input.type = 'text';

  const checkbox = document.createElement('input');
  checkbox.classList.add('tasks-check', 'inside-options');
  checkbox.type = 'checkbox';
  checkbox.checked = false;

  const details =  document.createElement('div');
  details.classList.add('details');
  
  const content =  document.createElement('div');
  content.classList.add('details__container'); 
  
  const button = document.createElement('button');
  button.classList.add('details__button');

  const icon = document.createElement('span');
  icon.classList.add('material-icons');
  icon.innerText = 'more_vert';
  
  const dropdown =  document.createElement('div');
  dropdown.classList.add('details__dropdown');

  const option = document.createElement('button');
  option.classList.add('details__option');
  option.dataset.i18n = 'task-delete';

  option.innerText = lang === 'en' ? 'Delete' : 'Eliminar';

  const warning = document.createElement('label');
  warning.classList.add('warning-text');
  warning.htmlFor = 'TaskModify';

  checkbox.addEventListener('click', () => changeTask(divTodo, divComp, container));

  option.addEventListener('click', () => {
    deleteTask(container, container.id);
    callback();
  });

  input.addEventListener('focusout', () => {
    let value = input.value;
    if(validateInput(value, warning, container)) {
      modifyTask(container.id, value + '-ToDo');
    }
  });

  input.addEventListener('keypress', (e) => (e.key === 'Enter') ? input.blur() : null);
  
  button.appendChild(icon);
  dropdown.appendChild(option);
  content.appendChild(button);
  details.append(content, dropdown);
  container.append(input, checkbox, details, warning);
  
  createTask(container.id, value);
  callback();
  return container;
}