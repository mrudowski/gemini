import React from 'react';
import HudButton from './components/HudButton/HudButton';

interface IHud {}

const Hud: React.FC<IHud> = () => {
  return <HudButton className="hudButton--switch" />;
};

export default Hud;
