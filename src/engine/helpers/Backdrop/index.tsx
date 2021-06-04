import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './style.scss';

interface IBackdrop {
  onClick?: () => void,
  dimmed?: boolean
}

const Backdrop = React.forwardRef((props: IBackdrop, ref: React.Ref<HTMLDivElement>) => {
  const {
    onClick = () => null,
    dimmed = false,
  } = props;

  const classes = classNames(
    'Backdrop',
    {'Backdrop--dimmed' : dimmed}
  );

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      ref={ref}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    />
  );
});

Backdrop.displayName = 'Backdrop';

export default Backdrop;
