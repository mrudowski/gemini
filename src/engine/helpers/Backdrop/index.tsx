import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './style.scss';

interface IBackdrop {
  onClick: () => void
}

const Backdrop = React.forwardRef((props: IBackdrop, ref: React.Ref<HTMLDivElement>) => {
  const {
    onClick = () => null
  } = props;

  const classes = classNames(
    'Backdrop'
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

export default Backdrop;
