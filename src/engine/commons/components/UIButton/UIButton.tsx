import React from 'react';
import classNames from 'classnames';
import './styles/UIButton.scss';

interface IUIButton {
  className?: string;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
  theme?: 'classic' | 'text';
}

const UIButton: React.FC<IUIButton> = ({children, disabled = false, active = false, onClick, theme = 'classic'}) => {
  const classes = classNames(
    'UIButton',
    `UIButton--${theme}`,
    !disabled && !active && 'gem-hotspot',
    active && 'UIButton--active'
  );

  const onClickProxy = () => {
    if (!disabled && !active) {
      onClick();
    }
  };

  return (
    <div className={classes} onClick={onClickProxy}>
      {children}
    </div>
  );
};

export default UIButton;
