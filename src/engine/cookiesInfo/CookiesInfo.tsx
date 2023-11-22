import React, {memo, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import classNames from 'classnames';
import {variants} from '../commons/motion/variants';
import styles from './CookiesInfo.module.scss';
import SETTINGS from '../../game/settings';
import {useTranslation} from '../translation';

const LS_PATH = `${SETTINGS.SAVE_GAME_NAME}_cookies`;

interface ICookiesInfo {}

const CookiesInfo: React.FC<ICookiesInfo> = () => {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = !!localStorage.getItem(LS_PATH);
    if (!cookiesAccepted) {
      setVisible(true);
    }
  }, []);

  const hide = () => {
    localStorage.setItem(LS_PATH, 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          className={classNames(styles.root, 'gem-hotspot')}
          onClick={hide}
        >
          <div className={styles.close}>x</div>
          <div className={styles.prompt}>{t.ui.cookiesInfo}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(CookiesInfo);
