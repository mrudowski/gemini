import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import ElmStandImage from '../assets/images/elm.png';
import SCENE_POIS from '../scenePois';

const ElmPoi = () => {
  return (
    <Poi
      id={SCENE_POIS.ElmPoi}
      style={{
        left: 662,
        top: 83,
        width: 244,
        height: 637,
      }}
      image={ElmStandImage}
    />
  );
};

export default ElmPoi;
