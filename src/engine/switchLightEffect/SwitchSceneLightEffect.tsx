import React from 'react';
import {useTypedSelector} from '../redux/store';
import {getSceneLightOff} from '../actions/switchLight/switchLightActionSlice';
import './styles/SwitchLightEffect.scss';
import SwitchLightEffect from './SwitchLightEffect';

interface ISwitchSceneLightEffect {}

const SwitchSceneLightEffect: React.FC<ISwitchSceneLightEffect> = () => {
  const sceneLightOff = useTypedSelector(getSceneLightOff);

  return <SwitchLightEffect lightOff={sceneLightOff} />;
};

export default SwitchSceneLightEffect;
