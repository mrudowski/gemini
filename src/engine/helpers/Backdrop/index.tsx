import React from 'react';
import classNames from 'classnames';
import './style.scss'

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
    <div
      className={classes}
      onClick={onClick}
      ref={ref}
    />
  );
});

export default Backdrop;
