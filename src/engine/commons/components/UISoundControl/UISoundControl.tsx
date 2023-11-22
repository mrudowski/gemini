import React from 'react';
import classNames from 'classnames';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/UISoundControl.scss';
import {useTranslation} from '../../../translation';
import UIButtonSwitch from '../UIButtonSwitch/UIButtonSwitch';
import {getIsSoundOn, setSound} from '../../../Gem/gemSlice';

interface ISoundControl {
  theme?: 'classic' | 'text';
}

const UISoundControl: React.FC<ISoundControl> = ({theme = 'classic'}) => {
  const t = useTranslation();
  const isSoundOn = useTypedSelector(getIsSoundOn);
  const dispatch = useTypedDispatch();

  const onChange = newSoundValue => {
    // fix for https://github.com/mrudowski/tos3/issues/151
    // delay setSound for Howler autoUnlock
    setTimeout(() => {
      dispatch(setSound(newSoundValue));
    }, 100);
  };

  const classes = classNames('UISoundControl', `UISoundControl--${theme}`);

  return (
    <div className={classes}>
      <div className="UISoundControl__label">{t.ui.inGameMenu.sound}</div>
      <UIButtonSwitch value={isSoundOn} onChange={onChange} theme={theme} />
    </div>
  );
};

export default UISoundControl;
