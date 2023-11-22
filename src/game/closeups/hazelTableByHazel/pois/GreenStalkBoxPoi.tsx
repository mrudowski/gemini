import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import greenStalk1 from '../assets/images/greenStalk1.png';
import greenStalk2 from '../assets/images/greenStalk2.png';
import greenStalk3 from '../assets/images/greenStalk3.png';
import greenStalk4 from '../assets/images/greenStalk4.png';
import greenStalk5 from '../assets/images/greenStalk5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [greenStalk1, greenStalk2, greenStalk3, greenStalk4, greenStalk5];

const GreenStalkBoxPoi = () => {
  const boxProps = useBoxProps('greenStalkBox', images);

  return (
    <Poi
      id={SCENE_POIS.greenStalkBox}
      style={{
        left: 1009 - 128,
        top: 390 - 70,
        width: 149,
        height: 167,
      }}
      hotspot={{
        left: 20, // 1029 - 1009
        top: 24, // 414 - 390
        width: 121,
        height: 132,
      }}
      {...boxProps}
    />
  );
};

export default GreenStalkBoxPoi;
