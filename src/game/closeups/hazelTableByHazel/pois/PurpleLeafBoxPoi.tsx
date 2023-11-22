import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import purpleLeaf1 from '../assets/images/purpleLeaf1.png';
import purpleLeaf2 from '../assets/images/purpleLeaf2.png';
import purpleLeaf3 from '../assets/images/purpleLeaf3.png';
import purpleLeaf4 from '../assets/images/purpleLeaf4.png';
import purpleLeaf5 from '../assets/images/purpleLeaf5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [purpleLeaf1, purpleLeaf2, purpleLeaf3, purpleLeaf4, purpleLeaf5];

const PurpleLeafBoxPoi = () => {
  const boxProps = useBoxProps('purpleLeafBox', images);

  return (
    <Poi
      id={SCENE_POIS.purpleLeafBox}
      style={{
        left: 810 - 128,
        top: 424 - 70,
        width: 187,
        height: 171,
      }}
      hotspot={{
        left: 21, // 831 - 810
        top: 29, // 453 - 424
        width: 151,
        height: 133,
      }}
      {...boxProps}
    />
  );
};

export default PurpleLeafBoxPoi;
