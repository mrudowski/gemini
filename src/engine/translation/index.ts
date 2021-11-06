import {useEffect} from 'react'; // TODO should not be part of engine
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getLangToLoad, setCurrentLang} from '../redux/gemSlice';
import SETTINGS from '../../game/settings';
import {ILangId} from '../../game/languages';
import pl from '../../game/i18n/pl';

type TLangObj = typeof pl;
let currentLangObj = pl;

const loadLangObj = async (lang: ILangId): Promise<TLangObj> => {
  const module = await import(`../../game/i18n/${lang}`);
  const newLangObj = module.default;
  console.log('%c [loadLang]', 'background-color:Gold; color: black', newLangObj);
  return newLangObj;
};

// init
loadLangObj(SETTINGS.PRIMARY_LANG).then(newLangObj => {
  currentLangObj = newLangObj;
});

// TODO to remove - it's an old way - used only in test scene!
const T = () => currentLangObj;
export default T;

// ----------------- hooks

export const useTranslation = () => {
  // to force the state update - not needed?
  // useTypedSelector(getCurrentLang);
  return currentLangObj;
};

export const useTranslationLoader = () => {
  const langToLoad = useTypedSelector(getLangToLoad);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    loadLangObj(langToLoad).then(newLangObj => {
      currentLangObj = newLangObj;
      dispatch(setCurrentLang(langToLoad));
      // no needed without
      // window.location.reload();
    });
  }, [langToLoad, dispatch]);
};
