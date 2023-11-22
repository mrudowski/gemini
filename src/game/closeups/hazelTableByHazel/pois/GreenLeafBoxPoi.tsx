import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import greenLeaf1 from '../assets/images/greenLeaf1.png';
import greenLeaf2 from '../assets/images/greenLeaf2.png';
import greenLeaf3 from '../assets/images/greenLeaf3.png';
import greenLeaf4 from '../assets/images/greenLeaf4.png';
import greenLeaf5 from '../assets/images/greenLeaf5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [greenLeaf1, greenLeaf2, greenLeaf3, greenLeaf4, greenLeaf5];

const GreenLeafBoxPoi = () => {
  const boxProps = useBoxProps('greenLeafBox', images);

  return (
    <Poi
      id={SCENE_POIS.greenLeafBox}
      style={{
        left: 744 - 128,
        top: 76 - 70,
        width: 176,
        height: 152,
      }}
      hotspot={{
        left: 16, // 760 - 744
        top: 16, // 92 - 76
        width: 151,
        height: 129,
      }}
      {...boxProps}
    />
  );
};

export default GreenLeafBoxPoi;
