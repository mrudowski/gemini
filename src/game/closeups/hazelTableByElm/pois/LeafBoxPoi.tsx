import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import Leaf1 from '../assets/images/leaf1.png';
import Leaf2 from '../assets/images/leaf2.png';
import Leaf3 from '../assets/images/leaf3.png';
import Leaf4 from '../assets/images/leaf4.png';
import Leaf5 from '../assets/images/leaf5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5];

const LeafBoxPoi = () => {
  const boxProps = useBoxProps('LeafBox', images);

  return (
    <Poi
      id={SCENE_POIS.LeafBox}
      style={{
        left: 757 - 128,
        top: 86 - 70,
        width: 230,
        height: 488,
      }}
      hotspot={{
        left: 36, // 793 - 757
        top: 77, // 163 - 86
        width: 161,
        height: 344,
      }}
     
      {...boxProps}
    />
  );
};

export default LeafBoxPoi;
