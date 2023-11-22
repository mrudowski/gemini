import React from 'react';
import {useTypedSelector} from '../redux/store';
import {getAppLightOff} from '../actions/switchLight/switchLightActionSlice';
import './styles/SwitchLightEffect.scss';
import SwitchLightEffect from './SwitchLightEffect';

interface ISwitchAppLightEffect {}

const SwitchSceneLightEffect: React.FC<ISwitchAppLightEffect> = () => {
  const appLightOff = useTypedSelector(getAppLightOff);

  return <SwitchLightEffect lightOff={appLightOff} />;
};

export default SwitchSceneLightEffect;
