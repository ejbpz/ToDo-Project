import { TodoApp } from "./src/todo-app";
import { getInitialSettings } from "./src/config/initSettings";

const ContainerComp = document.querySelector('#ContainerCompletedTasks');
const ClearAllButton = document.querySelector('#ButtonClearStorage');
const ContainerTodo = document.querySelector('#ContainerTodoTasks');
const LangOptions = document.querySelectorAll('.language__item');
const ThemeOptions = document.querySelectorAll('.theme__item');
const ContainerCreate = document.querySelector('.create');
const Titles = document.querySelectorAll('.subtitle');
const Body = document.querySelector('body');

TodoApp(Body, ContainerCreate, ContainerTodo, ContainerComp, ClearAllButton, ThemeOptions, LangOptions, Titles);

let { theme, lang } = getInitialSettings();

theme === 'dark' ? Body.classList.add('darkmode') : Body.classList.remove('darkmode');
lang === 'es' ? LangOptions[0].click() : LangOptions[1].click();