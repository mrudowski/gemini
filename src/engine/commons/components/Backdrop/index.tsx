import React from 'react';
import classNames from 'classnames';
import './style.scss';

interface IBackdrop {
  onClick?: () => void;
  dimmed?: boolean;
}

const emptyMethod = () => {};

const Backdrop = React.forwardRef((props: IBackdrop, ref: React.Ref<HTMLDivElement>) => {
  const {onClick = emptyMethod, dimmed = false} = props;

  const classes = classNames('Backdrop', {'Backdrop--dimmed': dimmed});

  return <div className={classes} onClick={onClick} ref={ref} />;
});

Backdrop.displayName = 'Backdrop';

export default Backdrop;
