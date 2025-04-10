import { newTask } from '@/factories/createTask';
import tasksStorage from '@/store/tasks-storage';
import { changeTask } from '@/use-cases/cange-task';

const compTasks = tasksStorage.getCompletedTasksLS();

export const renderCompContainer = (containerTodo, containerComp, callback) => {
  compTasks.forEach(task => {
    const compTask = newTask(task.key, task.value.split('-')[0], containerTodo, containerComp, callback);
    compTask.childNodes[1].checked = true;
    containerTodo.appendChild(compTask);
    changeTask(containerTodo, containerComp, compTask)
  });
}