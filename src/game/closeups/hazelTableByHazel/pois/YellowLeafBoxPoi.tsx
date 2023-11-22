import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import yellowLeaf1 from '../assets/images/yellowLeaf1.png';
import yellowLeaf2 from '../assets/images/yellowLeaf2.png';
import yellowLeaf3 from '../assets/images/yellowLeaf3.png';
import yellowLeaf4 from '../assets/images/yellowLeaf4.png';
import yellowLeaf5 from '../assets/images/yellowLeaf5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [yellowLeaf1, yellowLeaf2, yellowLeaf3, yellowLeaf4, yellowLeaf5];

const YellowLeafBoxPoi = () => {
  const boxProps = useBoxProps('yellowLeafBox', images);

  return (
    <Poi
      id={SCENE_POIS.yellowLeafBox}
      style={{
        left: 774 - 128,
        top: 208 - 70,
        width: 208,
        height: 220,
      }}
      hotspot={{
        left: 28, // 802 - 774
        top: 46, // 254 - 208
        width: 139,
        height: 159,
      }}
      {...boxProps}
    />
  );
};

export default YellowLeafBoxPoi;
