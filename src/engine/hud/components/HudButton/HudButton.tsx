import React from 'react';
import classNames from 'classnames';
import './styles/HudStyle.scss';

interface IHudButton {
  className: string;
}

const HudButton: React.FC<IHudButton> = ({className}) => {
  const classes = classNames('hudButton gem-hotspot', className);

  return (
    <>
      <div className={classes} />
    </>
  );
};

export default HudButton;
