import { renderAddInput } from "./components/render-add-input/render-add-input"
import { renderCompContainer } from "./components/render-completed-tasks/render-completed-tasks";
import { renderFooter } from "./components/render-footer/render-footer";
import { renderTodoContainer } from "./components/render-todo-tasks/render-todo-tasks";
import { newTask } from "./factories/createTask";
import { titlesHidden } from "./helpers/dom-helpers";
import { changeLanguage } from "./use-cases/change-language";
import { changeTheme } from "./use-cases/change-theme";
import { deleteAllTasks } from "./use-cases/delete-task";

export const TodoApp = (body, create, todo, completed, clearAll, themeOpt, langOpt, titles) => {
  clearAll.addEventListener('click', () => {
    deleteAllTasks(todo, completed);
    titlesHidden(todo, completed, titles);
  });

  renderAddInput(create, (value) => todo.append(newTask(null, value, todo, completed, () => titlesHidden(todo, completed, titles))), () => titlesHidden(todo, completed, titles));

  renderTodoContainer(todo, completed, () => titlesHidden(todo, completed, titles));
  renderCompContainer(todo, completed, () => titlesHidden(todo, completed, titles));
  renderFooter(body);
  changeLanguage(langOpt);
  changeTheme(body, themeOpt);
  titlesHidden(todo, completed, titles);
}