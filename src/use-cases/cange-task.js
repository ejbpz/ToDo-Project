import tasksStorage from "@/store/tasks-storage";
import { modifyTask } from "./save-task";

export const changeTask = (todoDiv, compDiv, parent) => {
  const input = parent.childNodes[0], checkbox = parent.childNodes[1], checked = checkbox.checked

  input.disabled = checked;
  if(checked) {
    todoDiv.removeChild(parent);
    compDiv.appendChild(parent);
  } else {
    compDiv.removeChild(parent);
    todoDiv.appendChild(parent);
  }

  input.classList.toggle('completed__input-task');

  let [task, type] = tasksStorage.getTaskLS(parent.id).split('-');
  type = type === 'ToDo' ? 'Completed' : 'ToDo';
  modifyTask(parent.id, `${task}-${type}`);
}