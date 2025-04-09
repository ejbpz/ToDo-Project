import tasksStorage from "../store/tasks-storage";

const changeContentLang = (langData, lang) => {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    document.querySelector('html').lang = lang;

    if(key === 'task-placeholder') {
      document.querySelector('#InputAddTask').placeholder = langData[key];
    }

    if(element.querySelector('a')) {
      const link = element.querySelector('a').outerHTML;
      element.innerHTML = `${langData[key]} ${link}`;
    } else {
      element.innerHTML = langData[key];
    }
  });
}

const fetchLanguage = async(lang) => {
  const data = await fetch(`i18n/${lang}.json`);
  return await data.json();
}

export const changeLanguage = (langOptions) => {
  langOptions[0].addEventListener('click', async () => {
    const langData = await fetchLanguage('es');
    tasksStorage.setLangLS('es');
    changeContentLang(langData, 'es');
  });

  langOptions[1].addEventListener('click', async () => {
    const langData = await fetchLanguage('en');
    tasksStorage.setLangLS('en');
    changeContentLang(langData, 'en');
  });

}