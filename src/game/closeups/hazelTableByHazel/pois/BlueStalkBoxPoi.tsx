import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import blueStalk1 from '../assets/images/blueStalk1.png';
import blueStalk2 from '../assets/images/blueStalk2.png';
import blueStalk3 from '../assets/images/blueStalk3.png';
import blueStalk4 from '../assets/images/blueStalk4.png';
import blueStalk5 from '../assets/images/blueStalk5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [blueStalk1, blueStalk2, blueStalk3, blueStalk4, blueStalk5];

const BlueStalkBoxPoi = () => {
  const boxProps = useBoxProps('blueStalkBox', images);

  return (
    <Poi
      id={SCENE_POIS.blueStalkBox}
      style={{
        left: 923 - 128,
        top: 58 - 70,
        width: 159,
        height: 136,
      }}
      hotspot={{
        left: 35, // 958 - 923
        top: 17, // 75 - 58
        width: 124,
        height: 108,
      }}
      {...boxProps}
    />
  );
};

export default BlueStalkBoxPoi;
