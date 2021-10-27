import React from 'react';
import Scene from '../../../engine/Scene';
import SCENES from '../../scenes';
// import {useTranslation} from '../../../engine/translation';
import hazelWorkshop from './assets/images/hazelWorkshop.jpg';
import elmImage from '../../assets/images/portraits/elm.png';
import hazelImage from '../../assets/images/portraits/hazel.png';
import PreloadImages from '../../../engine/Preload/PreloadImages';

const imagesToPreload = [elmImage, hazelImage];

const HazelWorkshopByHazelScene = () => {
  // const t = useTranslation();

  return (
    <Scene id={SCENES.hazelWorkshopByHazel} image={hazelWorkshop}>
      <PreloadImages images={imagesToPreload} />
    </Scene>
  );
};

export default HazelWorkshopByHazelScene;
