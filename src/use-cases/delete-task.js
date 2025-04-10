import tasksStorage from "@/store/tasks-storage";

export const deleteTask = (container, id) => {
  container.parentElement.removeChild(container);
  tasksStorage.deleteTaskLS(id);
}

export const deleteAllTasks = (containerTodo, containerComp) => {
  tasksStorage.deleteAllTasksLS();
  while(containerTodo.firstChild) containerTodo.removeChild(containerTodo.firstChild);
  while(containerComp.firstChild) containerComp.removeChild(containerComp.firstChild);
}