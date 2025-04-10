import cookiesStorage from "@/store/cookies-storage";

export const changeTheme = (body, themeOptions) => {
  themeOptions[0].addEventListener('click', () => {
    body.classList.add('darkmode');
    cookiesStorage.setTheme('dark');
  });

  themeOptions[1].addEventListener('click', () => {
    body.classList.remove('darkmode');
    cookiesStorage.setTheme('light');
  });
}