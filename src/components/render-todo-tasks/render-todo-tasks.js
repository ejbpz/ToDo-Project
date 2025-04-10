import { newTask } from '@/factories/createTask';
import tasksStorage from '@/store/tasks-storage';

const todoTasks = tasksStorage.getTodoTasksLS();

export const renderTodoContainer = (containerTodo, containerComp, callback) => {
  todoTasks.forEach(task => {
    containerTodo.appendChild(newTask(task.key, task.value.split('-')[0], containerTodo, containerComp, callback));
  });
}