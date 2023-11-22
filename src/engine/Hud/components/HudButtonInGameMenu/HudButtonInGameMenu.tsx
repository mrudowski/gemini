import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonInGameMenu.scss';
import HudButton from '../HudButton/HudButton';
import {toggleInGameMenu} from '../../../ui/inGameMenu/inGameMenuSlice';
import {getIsInGameMenuTriggerActive} from '../../hudSlice';

interface IHudButtonInGameMenu {}

const HudButtonInGameMenu: React.FC<IHudButtonInGameMenu> = () => {
  const dispatch = useTypedDispatch();
  const isInGameMenuTriggerActive = useTypedSelector(getIsInGameMenuTriggerActive);

  const toggleInGameMenuAction = (e: any) => {
    dispatch(toggleInGameMenu());
    e.preventDefault();
  };

  const hotKeysEnabled = {
    enabled: isInGameMenuTriggerActive,
  };

  useHotkeys('esc', toggleInGameMenuAction, hotKeysEnabled);

  return <HudButton className="hudButton--inGameMenu" onClick={toggleInGameMenuAction} />;
};

export default HudButtonInGameMenu;
