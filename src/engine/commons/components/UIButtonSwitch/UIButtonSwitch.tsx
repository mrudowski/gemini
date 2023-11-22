import React from 'react';
import './styles/UIButtonSwitch.scss';
import {useTranslation} from '../../../translation';
import UIButton from '../UIButton/UIButton';

interface IUIButtonSwitch {
  className?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  theme?: 'classic' | 'text';
}

const UIButtonSwitch: React.FC<IUIButtonSwitch> = ({value = false, onChange, theme}) => {
  const t = useTranslation();

  return (
    <div className="UIButtonSwitch">
      <UIButton
        active={value}
        onClick={() => {
          onChange(true);
        }}
        theme={theme}
      >
        {t.ui.inGameMenu.soundOn}
      </UIButton>
      <UIButton
        active={!value}
        onClick={() => {
          onChange(false);
        }}
        theme={theme}
      >
        {t.ui.inGameMenu.soundOff}
      </UIButton>
    </div>
  );
};

export default UIButtonSwitch;
