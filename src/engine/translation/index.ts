import en from '../../sampleGame01/i18n/en';
import {useSelector} from 'react-redux';

type TLang = typeof en;
let currentLangObj = {
  current: en
};

//const langRef: { current: TLang } = { current: currentLangObj.current };
// langRef.current = currentLangObj;

// in app
const loadLang = async (currentLang: string):Promise<TLang> => {
  const module = await import(`../../sampleGame01/i18n/${currentLang}`);
  const newLang = module.default;
  //t = newLang;
  console.log('%c [loadLang]', 'background-color:Gold; color: black', newLang);
  return newLang;
};

const switchLang = (lang: string) => {
  loadLang(lang).then(newLang => {
    currentLangObj.current = newLang;
    console.log('%c switchLang --->', 'background-color:Gold; color: black', currentLangObj);
  });
  // wont work without reloading app
  // should only change state - and then reload app - loadLang will be trigger before app
  // window.location.reload();
};

window['switchLang'] = switchLang;

loadLang('pl').then(newLang => {
  currentLangObj.current = newLang;
  console.log('%c load --->', 'background-color:Gold; color: black', currentLangObj);
});

export const t = currentLangObj

// export const t2 = (temp) => {
//   console.log('%c [t]', 'background-color:Gold; color: black', currentLangObj);
//   return window[''];
// }


export const useTranslation = () => {
  return { t1: t };
};

