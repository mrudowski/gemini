import React from 'react';
import classNames from 'classnames';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/UILangControl.scss';
import {useTranslation} from '../../../translation';
import {getCurrentLang} from '../../../Gem/gemSlice';
import UIButton from '../UIButton/UIButton';
import {LANGS_LABELS, LANGS_ORDER} from '../../../../game/i18n/languages';
import {setLangToLoad} from '../../../redux/tempSlice';

interface ISoundControl {
  theme?: 'classic' | 'text';
}

const UILangControl: React.FC<ISoundControl> = ({theme = 'classic'}) => {
  const t = useTranslation();
  const currentLang = useTypedSelector(getCurrentLang);
  const dispatch = useTypedDispatch();

  const onChange = newLangValue => {
    dispatch(setLangToLoad(newLangValue));
  };
  const classes = classNames('UILangControl', `UILangControl--${theme}`);

  return (
    <div className={classes}>
      <div className="UILangControl__label">{t.mainMeMnu.language}</div>
      <div className="UIButtonSwitch">
        {LANGS_ORDER.map(langId => {
          return (
            <UIButton
              key={langId}
              active={currentLang === langId}
              onClick={() => {
                onChange(langId);
              }}
              theme={theme}
            >
              {LANGS_LABELS[langId]}
            </UIButton>
          );
        })}
      </div>
    </div>
  );
};

export default UILangControl;
