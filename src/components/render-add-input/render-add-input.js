import { validateInput } from '@/validators/validateInput';
import './render-add-input.css';

export const renderAddInput = (element, callback, titles) => {
  const container = document.createElement('div');
  container.classList.add('wraper-task');

  const input = document.createElement('input');
  input.classList.add('create__input-task');
  input.dataset.i18n = 'task-placeholder';
  input.placeholder = 'Make the bed...';
  input.name = 'InputAddTask';
  input.id = 'InputAddTask';
  input.autofocus = true;
  input.type = 'text';

  const button = document.createElement('button');
  button.classList.add('create__button-add', 'inside-options');
  button.id = 'ButtonAddTask';

  const span = document.createElement('span');
  span.classList.add('material-icons', 'prevent-selected');
  span.innerText = 'add';

  const label = document.createElement('label');
  label.classList.add('warning-text');
  label.htmlFor = 'InputAddTask';
  label.id = 'WarningTask';

  button.addEventListener('click', () => {
    let value = input.value;
    if(validateInput(value, label)) {
      input.value = '';
      let task = callback(value);
      titles();
      return task;
    }
  });

  input.addEventListener('keypress', (e) => (e.key === 'Enter') ? button.click() : null);

  button.append(span);
  container.append(input, button, label);
  element.append(container);
}