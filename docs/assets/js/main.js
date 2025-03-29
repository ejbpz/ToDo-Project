import { deleteAllTasksLS, getHigherIdTaskLS, getTodoTasksLS, getCompletedTasksLS, newTaskLS, deleteDefaultDataLS, getTaskLS } from './storage.js';
import { titlesHidden, newTask, themeChange } from './dom.js';
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
  const Body = document.querySelector('body');

  const todoTasks = getTodoTasksLS();
  const completedTasks = getCompletedTasksLS();  
  const updateTitles = () => titlesHidden(ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks);

  const extractData = () => {
    deleteDefaultDataLS();

    (getTaskLS('theme') === 'dark') ? Body.classList.add('darkmode') : Body.classList.remove('darkmode'); 

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

    if(value) {
      let id = getHigherIdTaskLS();
      id++;
      
      document.querySelector('#WarningEmptyTask').style.display = 'none';
      ContainerTodoTasks.appendChild(newTask(value, id, modifyTask, changeTask, deleteTask, ContainerTodoTasks, ContainerCompletedTasks, TitleTodoTasks, TitleCompletedTasks));
      newTaskLS(id, value + '-ToDo');
      InputAddTask.value = '';
    } else {
      document.querySelector('#WarningEmptyTask').style.display = 'inline-block';
    }
  });

  InputAddTask.addEventListener('keypress', (event) => event.key === 'Enter' ? ButtonAddTask.click() : null);

  ButtonClearStorage.addEventListener('click', () => {
    deleteAllTasksLS();
    deleteAllTasks(ContainerTodoTasks, ContainerCompletedTasks);
    updateTitles();
  });

  themeChange(Body, ThemeOptions);
  extractData();
  updateTitles();
});
