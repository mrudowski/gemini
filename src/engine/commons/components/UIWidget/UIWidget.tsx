import React from 'react';
import {AnimatePresence} from 'framer-motion';
import classNames from 'classnames';
import UIWindow from '../UIWindow/UIWindow';

interface IUIWidget {
  onCloseComplete?: () => void;
  onOpenComplete?: () => void;
  onClose: () => void;
  isOpen: boolean;
  type?: 'default' | 'closeup' | 'notebook' | 'herbarium';
  className: string;
}

const UIWidget: React.FC<IUIWidget> = ({
  onCloseComplete,
  onOpenComplete,
  onClose,
  isOpen,
  children,
  type = 'default',
  className,
}) => {
  const classes = classNames(type === 'default' && 'UIWindow__box--default', className);

  return (
    <AnimatePresence>
      {isOpen && (
        <UIWindow
          onOpenComplete={onOpenComplete}
          onCloseComplete={onCloseComplete}
          onClose={onClose}
          className={classes}
        >
          {children}
        </UIWindow>
      )}
    </AnimatePresence>
  );
};

export default UIWidget;
