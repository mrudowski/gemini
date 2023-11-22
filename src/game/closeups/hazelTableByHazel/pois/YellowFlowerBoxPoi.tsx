import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import yellowFlower1 from '../assets/images/yellowFlower1.png';
import yellowFlower2 from '../assets/images/yellowFlower2.png';
import yellowFlower3 from '../assets/images/yellowFlower3.png';
import yellowFlower4 from '../assets/images/yellowFlower4.png';
import yellowFlower5 from '../assets/images/yellowFlower5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [yellowFlower1, yellowFlower2, yellowFlower3, yellowFlower4, yellowFlower5];

const YellowFlowerBoxPoi = () => {
  const boxProps = useBoxProps('yellowFlowerBox', images);

  return (
    <Poi
      id={SCENE_POIS.yellowFlowerBox}
      style={{
        left: 617 - 128,
        top: 446 - 70,
        width: 198,
        height: 186,
      }}
      hotspot={{
        left: 11, // 628 - 617
        top: 42, // 488 - 446
        width: 153,
        height: 124,
      }}
      {...boxProps}
    />
  );
};

export default YellowFlowerBoxPoi;
