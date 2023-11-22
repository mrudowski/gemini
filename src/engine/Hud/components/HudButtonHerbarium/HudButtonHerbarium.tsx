import React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonHerbarium.scss';
import HudButton from '../HudButton/HudButton';
import useSeekAttentionWhen from '../../../commons/hooks/useSeekAttentionWhen';
import {getIsHerbariumTriggerActive, getIsHerbariumTriggerVisible} from '../../hudSlice';
import {hideHerbarium, toggleHerbarium} from '../../../herbarium/herbariumWidgetSlice';

interface IHudButtonHerbarium {}

const HudButtonHerbarium: React.FC<IHudButtonHerbarium> = () => {
  const dispatch = useTypedDispatch();
  const isHerbariumTriggerVisible = useTypedSelector(getIsHerbariumTriggerVisible);
  const isHerbariumTriggerActive = useTypedSelector(getIsHerbariumTriggerActive);

  const seekAttention = useSeekAttentionWhen(isHerbariumTriggerVisible, isHerbariumTriggerVisible === true);

  const showHerbariumAction = (e: any) => {
    dispatch(toggleHerbarium());
    e.preventDefault();
  };

  const closeHerbariumAction = (e: any) => {
    dispatch(hideHerbarium());
    e.preventDefault();
  };

  const hotKeysEnabled = {
    enabled: isHerbariumTriggerActive, // could be simpler - when visible because we only support `esc`
  };

  useHotkeys('esc', closeHerbariumAction, hotKeysEnabled);

  return <HudButton className="hudButton--herbarium" onClick={showHerbariumAction} seekAttention={seekAttention} />;
};

export default HudButtonHerbarium;
