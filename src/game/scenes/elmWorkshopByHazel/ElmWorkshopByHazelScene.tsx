import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
import elmWorkshop1 from './assets/images/elmWorkshop1.jpg';
import ElmDeskPoi from './pois/ElmDeskPoi';
import StairsPoi from './pois/StairsPoi';

const ElmWorkshopByHazelScene = () => {
  // const t = useTranslation();

  return (
    <Scene
      id={SCENES.elmWorkshopByHazel}
      image={elmWorkshop1}
    >
      <ElmDeskPoi />
      <StairsPoi />
    </Scene>
  );

};

export default ElmWorkshopByHazelScene;
