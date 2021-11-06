import React from 'react';
import {AnimatePresence} from 'framer-motion';
import {getShowElmHazelSwitch} from '../redux/worldSlice';
import {useTypedSelector} from '../redux/store';
import HudButtonSwitch from './components/HudButtonSwitch/HudButtoSwitch';

interface IHud {}

const Hud: React.FC<IHud> = () => {
  const showElmHazelSwitch = useTypedSelector(getShowElmHazelSwitch);

  return <AnimatePresence>{showElmHazelSwitch && <HudButtonSwitch />}</AnimatePresence>;
};

export default Hud;
