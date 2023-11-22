import React from 'react';
import classNames from 'classnames';
import HudButton from '../HudButton/HudButton';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import './styles/HudButtonSwitchStyle.scss';
import useSeekAttentionWhen from '../../../commons/hooks/useSeekAttentionWhen';
import {switchActors} from '../../../actions/switchActor/switchActorActionThunk';
import {getIsElmHazelSwitchTriggerVisible} from '../../hudSlice';
import {getLookCloserSceneId} from '../../../closeup/CloseupViewer/lookCloserActionSlice';

interface IHudButtonSwitch {}

const HudButtonSwitch: React.FC<IHudButtonSwitch> = () => {
  const isElmHazelSwitchTriggerVisible = useTypedSelector(getIsElmHazelSwitchTriggerVisible);
  const lookCloserActive = !!useTypedSelector(getLookCloserSceneId);
  const dispatch = useTypedDispatch();
  const seekAttention = useSeekAttentionWhen(isElmHazelSwitchTriggerVisible, isElmHazelSwitchTriggerVisible === true);

  const elmHazelSwitchAction = () => {
    dispatch(switchActors('elmHazel'));
  };

  // we use lookCloserActive here and not inside isElmHazelSwitchTriggerVisible
  // because we want to hide and show it without seekAttention
  const classes = classNames('hudButton--switch', lookCloserActive && 'hudButton--hide');

  return <HudButton className={classes} onClick={elmHazelSwitchAction} seekAttention={seekAttention} />;
};

export default HudButtonSwitch;
