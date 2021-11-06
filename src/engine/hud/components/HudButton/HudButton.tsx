import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './styles/HudStyle.scss';
import {variants} from '../../../commons/motion/variants';

export interface IHudButton {
  className: string;
  onClick: () => void;
}

const HudButton: React.FC<IHudButton> = ({className, onClick}) => {
  const classes = classNames('hudButton gem-hotspot', className);

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants}>
      <div className={classes} onClick={onClick} />
    </motion.div>
  );
};

export default HudButton;
