import { getTaskLS, modifyTaskLS, deleteAllTasksLS, deleteTaskLS } from './storage.js';

export const changeTask = (taskCheckBox, taskInput, newTask = true) => {
  const parent = taskCheckBox.parentElement;
  taskInput.disabled = taskCheckBox.checked;

  if(taskCheckBox.checked) {
    ContainerTodoTasks.removeChild(parent);
    ContainerCompletedTasks.appendChild(parent);
  } else {
    ContainerCompletedTasks.removeChild(parent);
    ContainerTodoTasks.appendChild(parent);
  }

  taskInput.classList.toggle('completed__input-task');
  
  let task = getTaskLS(parent.id);
  if(task) {
    let [taskText, taskLevel] = task.split('-');
    newTask ? taskLevel = taskLevel === 'ToDo' ? 'Completed' : 'ToDo' : taskLevel = 'Completed';
    modifyTaskLS(parent.id, `${taskText}-${taskLevel}`);
  }
}

export const deleteAllTasks = (ContainerTodoTasks, ContainerCompletedTasks) => {
  deleteAllTasksLS();
  while(ContainerTodoTasks.firstChild) ContainerTodoTasks.removeChild(ContainerTodoTasks.firstChild);
  while(ContainerCompletedTasks.firstChild) ContainerCompletedTasks.removeChild(ContainerCompletedTasks.firstChild);
}

export const deleteTask = (taskContainer, task) => {
  taskContainer.removeChild(task)
  deleteTaskLS(task.id)
}

export const modifyTask = (value, taskContainer, taskWarning) => {
  if(value) {
    taskWarning.style.display = 'none';
    taskContainer.style.marginBottom = '0';
    modifyTaskLS(taskContainer.id, value + '-ToDo');
    console.log(taskContainer.id);
    
  } else {
    taskWarning.style.display = 'inline-block';
    taskContainer.style.marginBottom = '30px';
  }
}