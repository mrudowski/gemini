import React from 'react';
import HudButton from '../HudButton/HudButton';
import {useTypedDispatch, useTypedSelector} from '../../../redux/store';
import {getCurrentSceneId} from '../../../redux/gemSlice';
import SCENES from '../../../../game/scenes';
import {setNextSceneId} from '../../../redux/tempSlice';
import './styles/HudButtonSwitchStyle.scss';

interface IHudButtonSwitch {}

const HudButtonSwitch: React.FC<IHudButtonSwitch> = () => {
  const currentSceneId = useTypedSelector(getCurrentSceneId);
  const dispatch = useTypedDispatch();

  const elmHazelSwitchAction = () => {
    switch (currentSceneId) {
      case SCENES.elmWorkshopByHazel: {
        dispatch(setNextSceneId(SCENES.elmWorkshopByElm));
        return;
      }
      case SCENES.elmWorkshopByElm: {
        dispatch(setNextSceneId(SCENES.elmWorkshopByHazel));
        return;
      }
      case SCENES.hazelWorkshopByHazel: {
        dispatch(setNextSceneId(SCENES.hazelWorkshopByElm));
        return;
      }
      case SCENES.hazelWorkshopByElm: {
        dispatch(setNextSceneId(SCENES.hazelWorkshopByHazel));
        return;
      }
    }
  };

  return <HudButton className="hudButton--switch" onClick={elmHazelSwitchAction} />;
};

export default HudButtonSwitch;
