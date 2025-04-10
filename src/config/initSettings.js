import cookiesStorage from "@/store/cookies-storage"

export const getInitialSettings = () => {
  const theme = cookiesStorage.getTheme();
  const lang = cookiesStorage.getLanguage();
  return { theme, lang };
}