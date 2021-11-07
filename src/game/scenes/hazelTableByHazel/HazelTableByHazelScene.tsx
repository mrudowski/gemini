import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
// TODO MAREK change it to jpg
import hazelTable from './assets/images/hazelCloseUp.png';

const HazelTableByHazelScene = () => {
  // const t = useTranslation();

  return <Scene id={SCENES.hazelTableByHazel} image={hazelTable} />;
};

export default HazelTableByHazelScene;
