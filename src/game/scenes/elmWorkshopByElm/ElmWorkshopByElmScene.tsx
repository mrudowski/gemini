import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
import ElmDeskPoi from './pois/ElmDeskPoi';
import StairsPoi from './pois/StairsPoi';
import ElmPoi from './pois/ElmPoi';
import HazelExitPoi from './pois/HazelExitPoi';
import HazelSitPoi from './pois/HazelSitPoi';
import elmWorkshop from './assets/images/elmWorkshop.jpg';
import elmImage from '../../assets/images/portraits/elm.png';
import hazelImage from '../../assets/images/portraits/hazel.png';
import PreloadImages from '../../../engine/Preload/PreloadImages';

const imagesToPreload = [elmImage, hazelImage];

const ElmWorkshopByElmScene = () => {
  // const t = useTranslation();

  return (
    <Scene id={SCENES.elmWorkshopByHazel} image={elmWorkshop}>
      <PreloadImages images={imagesToPreload} />

      <ElmDeskPoi />
      <ElmPoi />
      <StairsPoi />
      <HazelExitPoi />
      <HazelSitPoi />
    </Scene>
  );
};

export default ElmWorkshopByElmScene;
