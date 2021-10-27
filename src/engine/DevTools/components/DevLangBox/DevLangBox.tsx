import React from 'react';
import './styles/DevLandBox.scss';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentLang, setLangToLoad} from '../../../redux/gemSlice';

interface IDevLocationBox {}

const buildLangList = (langs: string[]) =>
  langs.map(lang => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ));

const DevLangBox: React.FC<IDevLocationBox> = () => {
  const dispatch = useTypedDispatch();
  const currentLang = useTypedSelector(getCurrentLang);

  const changeLang = e => {
    dispatch(setLangToLoad(e.target.value));
  };

  // TODO read lang array from settings or something

  return (
    <div className="devPanel devLangBox">
      <select onChange={changeLang} value={currentLang}>
        {buildLangList(['pl', 'en'])}
      </select>
    </div>
  );
};

export default DevLangBox;
