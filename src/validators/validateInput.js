import cookiesStorage from '../store/cookies-storage';

const containerReduce = (container) => {
  container.style.marginBottom = '0';
}

const containerHeight = (container) => {
  container.style.marginBottom = '30px';
}

export const validateInput = (value, warning, container = null) => {
  const lang = cookiesStorage.getLanguage();
  if(container) containerReduce(container);
  if(value.trim() && !value.includes('-')) {
    warning.style.display = 'none';
    return true;
  }
  
  if(container) containerHeight(container);
  if(value.includes('-')) {
    warning.innerHTML = lang === 'es' ? "La tarea no puede tener '-'" : "The task cannot have a '-'"
    warning.style.display = 'inline-block';
    return false;
  }
  
  if(!value.trim()) {
    warning.innerHTML = lang === 'es' ? '¡Necesitas escribir una tarea!' : "You'll need to write a task!";
    warning.style.display = 'inline-block';
    return false;
  }
}