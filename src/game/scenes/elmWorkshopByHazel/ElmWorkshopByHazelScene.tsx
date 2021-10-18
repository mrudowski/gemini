import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
import elmWorkshop from './assets/images/elmWorkshop.jpg';
import ElmDeskPoi from './pois/ElmDeskPoi';
import StairsPoi from './pois/StairsPoi';
import ElmPoi from './pois/ElmPoi';
import HazelExitPoi from './pois/HazelExitPoi';
import HazelSitPoi from './pois/HazelSitPoi';
import elmImage from '../../assets/images/portraits/elm.png';
import hazelImage from '../../assets/images/portraits/hazel.png';
import PreloadImage from '../../../engine/Preload/PreloadImage';

//const imagesToPreload = [elmImage, hazelImage];

const ElmWorkshopByHazelScene = () => {
  // const t = useTranslation();
  //usePreload(imagesToPreload);

  return (
    <Scene id={SCENES.elmWorkshopByHazel} image={elmWorkshop}>
      <PreloadImage image={elmImage} />
      <PreloadImage image={hazelImage} />

      <ElmDeskPoi />
      <ElmPoi />
      <StairsPoi />
      <HazelExitPoi />
      <HazelSitPoi />
    </Scene>
  );
};

export default ElmWorkshopByHazelScene;
