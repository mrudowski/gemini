import React from 'react';
import './styles/DevLandBox.scss';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentLang} from '../../../Gem/gemSlice';
import {LANGS_ORDER} from '../../../../game/i18n/languages';
import {setLangToLoad} from '../../../redux/tempSlice';

interface IDevLocationBox {}

const langOptions = LANGS_ORDER.map(lang => (
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

  return (
    <div className="devPanel devLangBox">
      <select onChange={changeLang} value={currentLang}>
        {langOptions}
      </select>
    </div>
  );
};

export default DevLangBox;
