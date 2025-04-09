import tasksStorage from "../store/tasks-storage"

export const getInitialSettings = () => {
  const theme = tasksStorage.getThemeLS();
  const lang = tasksStorage.getLangLS();
  return { theme, lang };
}