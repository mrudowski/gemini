import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
import elmWorkshop1 from './assets/images/elmWorkshop1.jpg';
import ElmDeskPoi from './pois/ElmDeskPoi';
import StairsPoi from './pois/StairsPoi';
import ElmPoi from './pois/ElmPoi';
import HazelExitPoi from './pois/HazelExitPoi';
import HazelSitPoi from './pois/HazelSitPoi';

const ElmWorkshopByHazelScene = () => {
  // const t = useTranslation();

  return (
    <Scene
      id={SCENES.elmWorkshopByHazel}
      image={elmWorkshop1}
    >
      <ElmDeskPoi />
      <ElmPoi />
      <StairsPoi />
      <HazelExitPoi />
      <HazelSitPoi />
    </Scene>
  );

};

export default ElmWorkshopByHazelScene;
