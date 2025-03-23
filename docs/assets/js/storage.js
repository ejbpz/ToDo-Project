const data = Array.from({length: localStorage.length}, (element, i) => {
  const key = localStorage.key(i);
  return {key: key, value: localStorage.getItem(key)}
});

export const getHigherIdTaskLS = () => {
  let maxNumber = 0;

  for(let i = 0; i < localStorage.length; i++) {
    let id = parseInt(localStorage.key(i));
    if(!isNaN(id) && id > maxNumber) maxNumber = id;
  }

  return maxNumber;
}

export const deleteDefaultDataLS = () => {
  localStorage.removeItem('theme');
  localStorage.removeItem('language');
}

export const getTodoTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'ToDo');

export const getCompletedTasksLS = () => Array.from(data).filter(task => task.value.split('-')[1] === 'Completed');

export const deleteAllTasksLS = () => localStorage.clear();

export const deleteTaskLS = (id) => localStorage.removeItem(id);

export const modifyTaskLS = (id, value) => localStorage.setItem(id, value);

export const newTaskLS = (id, value) => localStorage.setItem(id, value);

export const getTaskLS = (id) => localStorage.getItem(id);