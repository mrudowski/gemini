import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import Flower1 from '../assets/images/flower1.png';
import Flower2 from '../assets/images/flower2.png';
import Flower3 from '../assets/images/flower3.png';
import Flower4 from '../assets/images/flower4.png';
import Flower5 from '../assets/images/flower5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [Flower1, Flower2, Flower3, Flower4, Flower5];

const FlowerBoxPoi = () => {
  const boxProps = useBoxProps('FlowerBox', images);

  return (
    <Poi
      id={SCENE_POIS.FlowerBox}
      style={{
        left: 581 - 128,
        top: 131 - 70,
        width: 233,
        height: 489,
      }} 
      hotspot={{
        left: 18, // 599 - 581
        top: 64, // 195 - 131
        width: 158,
        height: 344,
      }}
      {...boxProps}
    />
  );
};

export default FlowerBoxPoi;
