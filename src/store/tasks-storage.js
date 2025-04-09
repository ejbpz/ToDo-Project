const data = Object.entries(localStorage).map(([key, value]) => ({key, value}));

const getHigherIdTaskLS = () => Object.keys(localStorage).map(Number).filter(key => !isNaN(key)).reduce((maxKey, key) => Math.max(maxKey, key), 0);

const getTodoTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'ToDo');

const getCompletedTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'Completed');

// TODO: language y theme pasarlo a cookies.
const deleteAllTasksLS = () => {
  const theme = getTaskLS('theme');
  const lang = getTaskLS('language');
  localStorage.clear();
  if(theme) newTaskLS('theme', theme);
  if(lang) newTaskLS('language', lang);
}

const deleteTaskLS = (id) => localStorage.removeItem(id);

const modifyTaskLS = (id, value) => localStorage.setItem(id, value);

const newTaskLS = (id, value) => localStorage.setItem(id, value);

const getTaskLS = (id) => localStorage.getItem(id);

const getThemeLS = () => localStorage.getItem('theme');

const getLangLS = () => localStorage.getItem('language');

const setThemeLS = (value) => localStorage.setItem('theme', value);

const setLangLS = (value) => localStorage.setItem('language', value);

export default {
  getHigherIdTaskLS,
  getTodoTasksLS,
  getCompletedTasksLS,
  deleteAllTasksLS,
  deleteTaskLS,
  modifyTaskLS,
  newTaskLS,
  getTaskLS,
  getThemeLS,
  getLangLS,
  setThemeLS,
  setLangLS
}