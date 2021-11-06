import React from 'react';
import {batch} from 'react-redux';
import HudButton from '../HudButton/HudButton';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentSceneId} from '../../../redux/gemSlice';
import SCENES from '../../../../game/scenes';
import {setNextSceneId} from '../../../redux/tempSlice';
import './styles/HudButtonSwitchStyle.scss';
import {setCurrentActorId} from '../../../redux/worldSlice';
import ACTORS from '../../../../game/actors';

interface IHudButtonSwitch {}

const HudButtonSwitch: React.FC<IHudButtonSwitch> = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const dispatch = useTypedDispatch();

  const elmHazelSwitchAction = () => {
    switch (currentSceneId) {
      case SCENES.elmWorkshopByHazel: {
        batch(() => {
          dispatch(setNextSceneId(SCENES.elmWorkshopByElm));
          dispatch(setCurrentActorId(ACTORS.elm));
        });
        return;
      }
      case SCENES.elmWorkshopByElm: {
        batch(() => {
          dispatch(setNextSceneId(SCENES.elmWorkshopByHazel));
          dispatch(setCurrentActorId(ACTORS.hazel));
        });
        return;
      }
      case SCENES.hazelWorkshopByHazel: {
        batch(() => {
          dispatch(setNextSceneId(SCENES.hazelWorkshopByElm));
          dispatch(setCurrentActorId(ACTORS.elm));
        });
        return;
      }
      case SCENES.hazelWorkshopByElm: {
        batch(() => {
          dispatch(setNextSceneId(SCENES.hazelWorkshopByHazel));
          dispatch(setCurrentActorId(ACTORS.hazel));
        });
        return;
      }
    }
  };

  return <HudButton className="hudButton--switch" onClick={elmHazelSwitchAction} />;
};

export default HudButtonSwitch;
