import React, {useEffect} from 'react';
import classNames from 'classnames';
import {motion, useAnimation} from 'framer-motion';
import './styles/HudStyle.scss';
import {variants} from '../../../commons/motion/variants';

export interface IHudButton {
  className: string;
  onClick: (e) => void;
  seekAttention?: Record<string, never> | null;
}

const seekAttentionAnimation = {
  opacity: 1,
  scale: [1, 1.2, 1, 1.1, 1], //pulse heartbeat
}; // rotate: [0, 720]

const HudButton: React.FC<IHudButton> = ({className, onClick, seekAttention}) => {
  const classes = classNames('hudButton gem-hotspot', className);
  const controls = useAnimation();

  useEffect(() => {
    if (!seekAttention) {
      controls.start(variants.visible);
    } else {
      controls.start(seekAttentionAnimation);
    }
  }, [seekAttention, controls]);

  return (
    <motion.div
      initial="hidden"
      animate="visible" // when animate={controls} we have no exit animation (no exit at all)
      exit="hidden"
      variants={variants}
      className={classes}
      onClick={onClick}
    >
      <motion.div animate={controls}>
        <div className="hudButton__icon" />
      </motion.div>
    </motion.div>
  );
};

export default HudButton;
