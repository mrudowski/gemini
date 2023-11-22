import {useEffect} from 'react'; // TODO should not be part of engine
import {batch} from 'react-redux';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {getCurrentLang, setCurrentLang} from '../Gem/gemSlice';
import en, {ILanguageObjectType} from '../../game/i18n/en';
import {ILangId} from './types';
import {getIsLangLoaded, getLangToLoad} from '../redux/tempSliceSelectors';
import {setLangLoaded} from '../redux/tempSlice';

let currentLangObj = en;
export type TLangObj = ILanguageObjectType; // we duplicate it because we use TLangObj in many places

const langSideEffect = (newLangObj: ILanguageObjectType) => {
  document.title = newLangObj.title;
  document.body.className = `lang-${newLangObj.id}`;
};

const loadLangObj = async (lang: ILangId): Promise<ILangId> => {
  const module = await import(`../../game/i18n/${lang}`);
  const newLangObj = module.default;
  langSideEffect(newLangObj);
  currentLangObj = newLangObj;
  return lang;
};

// TODO to remove? - it's an old way (before hook) - but we handy and we use it in TalkOptions
const T = () => currentLangObj;
export default T;

// ----------------- hooks

export const useTranslation = () => {
  // to force the state update
  useTypedSelector(getCurrentLang);
  useTypedSelector(getIsLangLoaded);
  return currentLangObj;
};

export const useTranslationLoader = () => {
  const langToLoad = useTypedSelector(getLangToLoad);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    loadLangObj(langToLoad).then(langId => {
      batch(() => {
        dispatch(setCurrentLang(langId));
        dispatch(setLangLoaded()); // needed for cookies in memo because on load langId doesn't change
      });

      // no needed
      // window.location.reload();
    });
  }, [langToLoad, dispatch]);
};
