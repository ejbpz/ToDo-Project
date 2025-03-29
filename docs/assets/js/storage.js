const data = Object.entries(localStorage).map(([key, value]) => ({key, value}));

export const getHigherIdTaskLS = () => Object.keys(localStorage).map(Number).filter(key => !isNaN(key)).reduce((maxKey, key) => Math.max(maxKey, key), 0);

export const deleteDefaultDataLS = () => localStorage.removeItem('language');

export const getTodoTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'ToDo');

export const getCompletedTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'Completed');

export const deleteAllTasksLS = () => {
  const theme = getTaskLS('theme');
  localStorage.clear();
  if(theme) newTaskLS('theme', theme);
}

export const deleteTaskLS = (id) => localStorage.removeItem(id);

export const modifyTaskLS = (id, value) => localStorage.setItem(id, value);

export const newTaskLS = (id, value) => localStorage.setItem(id, value);

export const getTaskLS = (id) => localStorage.getItem(id);