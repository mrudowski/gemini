import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import redFlower1 from '../assets/images/redFlower1.png';
import redFlower2 from '../assets/images/redFlower2.png';
import redFlower3 from '../assets/images/redFlower3.png';
import redFlower4 from '../assets/images/redFlower4.png';
import redFlower5 from '../assets/images/redFlower5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [redFlower1, redFlower2, redFlower3, redFlower4, redFlower5];

const RedFlowerBoxPoi = () => {
  const boxProps = useBoxProps('redFlowerBox', images);

  return (
    <Poi
      id={SCENE_POIS.redFlowerBox}
      style={{
        left: 563 - 128,
        top: 88 - 70,
        width: 183,
        height: 178,
      }}
      hotspot={{
        left: 12, // 575 - 563
        top: 29, // 117 - 88
        width: 154,
        height: 125,
      }}
      {...boxProps}
    />
  );
};

export default RedFlowerBoxPoi;
