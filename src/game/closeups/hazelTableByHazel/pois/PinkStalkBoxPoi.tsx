import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import pinkStalk1 from '../assets/images/pinkStalk1.png';
import pinkStalk2 from '../assets/images/pinkStalk2.png';
import pinkStalk3 from '../assets/images/pinkStalk3.png';
import pinkStalk4 from '../assets/images/pinkStalk4.png';
import pinkStalk5 from '../assets/images/pinkStalk5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [pinkStalk1, pinkStalk2, pinkStalk3, pinkStalk4, pinkStalk5];

const PinkStalkBoxPoi = () => {
  const boxProps = useBoxProps('pinkStalkBox', images);

  return (
    <Poi
      id={SCENE_POIS.pinkStalkBox}
      style={{
        left: 979 - 128,
        top: 179 - 70,
        width: 166,
        height: 210,
      }}
      hotspot={{
        left: 18, // 997 - 979
        top: 38, // 217 - 179
        width: 133,
        height: 166,
      }}
      {...boxProps}
    />
  );
};

export default PinkStalkBoxPoi;
