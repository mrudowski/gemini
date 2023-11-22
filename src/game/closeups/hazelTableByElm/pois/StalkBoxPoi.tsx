import React from 'react';
import Poi from '../../../../engine/Poi/Poi';
import Stalk1 from '../assets/images/stalk1.png';
import Stalk2 from '../assets/images/stalk2.png';
import Stalk3 from '../assets/images/stalk3.png';
import Stalk4 from '../assets/images/stalk4.png';
import Stalk5 from '../assets/images/stalk5.png';
import SCENE_POIS from '../scenePois';
import useBoxProps from './utils/useBoxProps';

const images = [Stalk1, Stalk2, Stalk3, Stalk4, Stalk5];

const StalkBoxPoi = () => {
  const boxProps = useBoxProps('StalkBox', images);

  return (
    <Poi
      id={SCENE_POIS.StalkBox}
      style={{
        left: 948 - 128,
        top: 92 - 70,
        width: 189,
        height: 461,
      }}
      hotspot={{
        left: 39, // 987 - 948
        top: 27, // 119 - 92
        width: 150,
        height: 363,
      }}
      {...boxProps}
    />
  );
};

export default StalkBoxPoi;
