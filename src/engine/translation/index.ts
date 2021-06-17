import en from '../../game/i18n/en'; // TODO should not be part of engine

type TLang = typeof en;
let currentLang = en;

//const langRef: { current: TLang } = { current: currentLangObj.current };
// langRef.current = currentLangObj;

// in app
const loadLang = async (lang: string):Promise<TLang> => {
  const module = await import(`../../game/i18n/${lang}`);
  const newLang = module.default;
  //t = newLang;
  console.log('%c [loadLang]', 'background-color:Gold; color: black', newLang);
  return newLang;
};

const switchLang = (lang: string) => {
  loadLang(lang).then(newLang => {
    currentLang = newLang;
    console.log('%c switchLang --->', 'background-color:Gold; color: black', currentLang);
  });
  // wont work without reloading app
  // should only change state - and then reload app - loadLang will be trigger before app
  // window.location.reload();
};

// TODO for test only
window['switchLang'] = switchLang;

loadLang('pl').then(newLang => {
  currentLang = newLang;
  console.log('%c load --->', 'background-color:Gold; color: black', currentLang);
});

//export const T = currentLang
const T = () => currentLang;

// export const t2 = (temp) => {
//   console.log('%c [t]', 'background-color:Gold; color: black', currentLangObj);
//   return window[''];
// }


// export const useTranslation = () => {
//   return { t1: t };
// };

export default T;
