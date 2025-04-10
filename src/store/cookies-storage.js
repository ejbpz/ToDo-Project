const daysToExpire = 90;
let dateNow = new Date();
dateNow.setDate(dateNow.getDate() + daysToExpire)

const getElement = (key) => {
  let value = null;
  document.cookie.split(';').forEach(cookie => {
    let name = cookie.trim().split('=');
    if(name[0] === key) value = name[1];
  });
  return value;
}

const setTheme = (value) => document.cookie = `theme=${value}; expires=${dateNow.toUTCString()}; path=/`;

const setLanguage = (value) => {
  document.cookie = `language=${value}; expires=${dateNow.toUTCString()}; path=/`
}

const getTheme = () => getElement('theme');

const getLanguage = () => getElement('language');

export default {
  setTheme,
  setLanguage,
  getTheme,
  getLanguage
}