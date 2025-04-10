import tasksStorage from "@/store/tasks-storage";

export const changeTheme = (body, themeOptions) => {
  themeOptions[0].addEventListener('click', () => {
    body.classList.add('darkmode');
    tasksStorage.setThemeLS('dark');
  });

  themeOptions[1].addEventListener('click', () => {
    body.classList.remove('darkmode');
    tasksStorage.setThemeLS('light');
  });
}