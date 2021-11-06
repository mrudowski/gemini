import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './styles/HudStyle.scss';
import {variants} from '../../../commons/motion/variants';

export interface IHudButton {
  className: string;
  onClick: () => void;
}

const demonstration = {opacity: 1, scale: [0, 1], rotate: [0, 720]};

const HudButton: React.FC<IHudButton> = ({className, onClick}) => {
  const classes = classNames('hudButton gem-hotspot', className);

  // for now
  const test = true;

  return (
    <motion.div
      initial="hidden"
      animate={test ? demonstration : 'visible'}
      exit="hidden"
      variants={variants}
      className={classes}
      onClick={onClick}
    >
      <div className="hudButton__icon" />
    </motion.div>
  );
};

export default HudButton;
