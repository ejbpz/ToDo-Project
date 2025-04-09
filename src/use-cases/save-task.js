import tasksStorage from "../store/tasks-storage";

export const createTask = (id, value) => tasksStorage.newTaskLS(id, value + '-ToDo');

export const modifyTask = (id, value) => tasksStorage.modifyTaskLS(id, value);