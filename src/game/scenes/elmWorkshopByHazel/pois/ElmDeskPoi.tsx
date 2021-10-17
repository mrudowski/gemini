import React from 'react';
import Poi from '../../../../engine/Poi';
import elmDeskImage from '../assets/images/elmDesk.png';
import SCENE_POIS from '../scenePois';

const ElmDeskPoi = () => {

  return (
    <Poi
      id={SCENE_POIS.elmDesk}
      style={{
        left: 93,
        top: 67,
        width: 751,
        height: 653
      }}
      image={elmDeskImage}
    />
  );

};

export default ElmDeskPoi;
