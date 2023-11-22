import React, {useCallback, useState} from 'react';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import Backdrop from '../Backdrop';
import {variants} from '../../motion/variants';
import './styles/UIWindow.scss';
import GemSuspense from '../GemSuspense/GemSuspense';

interface IUIWindow {
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
  onClose: () => void;
  className: string;
}

const UIWindow: React.FC<IUIWindow> = ({onOpenComplete, onCloseComplete, onClose, children, className}) => {
  const [ready, setReady] = useState(true); // when false we cannot animate when no Suspense

  const onAnimationComplete = useCallback(
    definition => {
      if (!ready) return;

      if (definition === 'visible') {
        onOpenComplete?.();
      } else {
        onCloseComplete?.();
      }
    },
    [onOpenComplete, onCloseComplete, ready]
  );

  return (
    <div className="UIWindow">
      <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} className="UIWindow__dimmed">
        <Backdrop dimmed={true} onClick={onClose} />
      </motion.div>
      <GemSuspense onReady={setReady} kind="ui">
        <motion.div
          initial="hidden"
          animate={!ready ? 'hidden' : 'visible'}
          exit="hidden"
          variants={variants}
          onAnimationComplete={onAnimationComplete}
        >
          <div className={classNames('UIWindow__box', className)}>
            {children}
            <div className="UIWindow__border" />
          </div>
        </motion.div>
      </GemSuspense>
    </div>
  );
};

export default UIWindow;
