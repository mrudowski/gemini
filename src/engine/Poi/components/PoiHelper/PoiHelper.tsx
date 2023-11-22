import React from 'react';
import {motion} from 'framer-motion';
import './styles/PoiHelper.scss';
import {poiHelperVariants} from '../../../commons/motion/variants';

export interface IPoiHelper {}

const PoiHelper: React.FC<IPoiHelper> = () => {
  return (
    <motion.div initial="initial" animate="visible" exit="exit" variants={poiHelperVariants} className="PoiHelper" />
  );
};

export default PoiHelper;
