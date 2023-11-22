import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import blueFlower1 from '../assets/images/blueFlower1.png';
import blueFlower2 from '../assets/images/blueFlower2.png';
import blueFlower3 from '../assets/images/blueFlower3.png';
import blueFlower4 from '../assets/images/blueFlower4.png';
import blueFlower5 from '../assets/images/blueFlower5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [blueFlower1, blueFlower2, blueFlower3, blueFlower4, blueFlower5];

const BlueFlowerBoxPoi = () => {
  const boxProps = useBoxProps('blueFlowerBox', images);

  return (
    <Poi
      id={SCENE_POIS.blueFlowerBox}
      style={{
        left: 585 - 128,
        top: 242 - 70,
        width: 209,
        height: 217,
      }}
      hotspot={{
        left: 24, // 609 - 585
        top: 40, // 282 - 242
        width: 135,
        height: 164,
      }}
      {...boxProps}
    />
  );
};

export default BlueFlowerBoxPoi;
