import { deleteAllTasksLS, getHigherIdTaskLS, getTodoTasksLS, getCompletedTasksLS, newTaskLS, getTaskLS } from './storage.js';
import { titlesHidden, newTask, themeChange, languageChange } from './dom.js';
import { changeTask, deleteAllTasks, deleteTask, modifyTask } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
  const InputAddTask = document.querySelector('#InputAddTask');
  const ButtonClearStorage = document.querySelector('#ButtonClearStorage');
  const ButtonAddTask = document.querySelector('#ButtonAddTask');
  const ContainerTodoTasks = document.querySelector('#ContainerTodoTasks');
  const ContainerCompletedTasks = document.querySelector('#ContainerCompletedTasks');
  const TitleTodoTasks = document.querySelector('#TitleTodoTasks');
  const TitleCompletedTasks = document.querySelector('#TitleCompletedTasks');
  const ThemeOptions = document.querySelectorAll('.theme__item');
  const LangOptions = document.querySelectorAll('.language__item');
  const Body = document.querySelector('body');
  const WarningTask = document.querySelector('#WarningTask');

  const todoTasks = getTodoTasksLS();
  const completedTasks = getCompletedTasksLS();  
  const updateTitles = () => titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);

  const extractData = () => {
    (getTaskLS('theme') === 'dark') ? Body.classList.add('darkmode') : Body.classList.remove('darkmode'); 
    (getTaskLS('language') === 'es') ? LangOptions[0].click() : LangOptions[1].click(); 

    todoTasks.forEach(task => {
      ContainerTodoTasks.appendChild(newTask(task.value.split('-')[0], task.key, modifyTask, changeTask, deleteTask, ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks));
    });

    completedTasks.forEach(task => {
      const completedTask = newTask(task.value.split('-')[0], task.key, modifyTask, changeTask, deleteTask, ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks)
      ContainerTodoTasks.appendChild(completedTask);
      completedTask.childNodes[1].checked = true;
      changeTask(completedTask.childNodes[1], completedTask.childNodes[0], ContainerTodoTasks, ContainerCompletedTasks, false);
    });
  }

  ButtonAddTask.addEventListener('click', () => {
    let value = InputAddTask.value;
    let lang = getTaskLS('language');

    if(value && !value.includes('-')) {
      let id = getHigherIdTaskLS();
      id++;
      
      WarningTask.style.display = 'none';
      ContainerTodoTasks.appendChild(newTask(value, id, modifyTask, changeTask, deleteTask, ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks));
      newTaskLS(id, value + '-ToDo');
      InputAddTask.value = '';
      updateTitles();
    } else if(value.includes('-')) {
      WarningTask.innerHTML = lang === 'es' ? "La tarea no puede tener '-'" : "The task cannot have a '-'";
      WarningTask.style.display = 'inline-block';
    } else {
      WarningTask.innerHTML = lang === 'es' ? '¡Necesitas escribir una tarea!' : "You'll need to write a task!";
      WarningTask.style.display = 'inline-block';
    }
  });

  InputAddTask.addEventListener('keypress', (event) => event.key === 'Enter' ? ButtonAddTask.click() : null);

  ButtonClearStorage.addEventListener('click', () => {
    deleteAllTasksLS();
    deleteAllTasks(ContainerTodoTasks, ContainerCompletedTasks);
    updateTitles();
  });

  themeChange(Body, ThemeOptions);
  languageChange(LangOptions);
  extractData();
  updateTitles();
});
