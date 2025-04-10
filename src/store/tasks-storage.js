const data = Object.entries(localStorage).map(([key, value]) => ({key, value}));

const getHigherIdTaskLS = () => Object.keys(localStorage).map(Number).filter(key => !isNaN(key)).reduce((maxKey, key) => Math.max(maxKey, key), 0);

const getTodoTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'ToDo');

const getCompletedTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'Completed');

const deleteAllTasksLS = () => localStorage.clear();

const deleteTaskLS = (id) => localStorage.removeItem(id);

const modifyTaskLS = (id, value) => localStorage.setItem(id, value);

const newTaskLS = (id, value) => localStorage.setItem(id, value);

const getTaskLS = (id) => localStorage.getItem(id);

export default {
  getHigherIdTaskLS,
  getTodoTasksLS,
  getCompletedTasksLS,
  deleteAllTasksLS,
  deleteTaskLS,
  modifyTaskLS,
  newTaskLS,
  getTaskLS
}