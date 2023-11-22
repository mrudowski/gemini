import React, {CSSProperties, useState} from 'react';
import {motion} from 'framer-motion';
import styles from './styles/ComicFrame.module.scss';
import {showImageHideInstantlyVariants, showImageVariants} from '../../../commons/motion/variants';
import {TImagePath} from '../../../commons/types/types';
import PreloadImage from '../../../Preload/PreloadImage';
import GemSuspense from '../../../commons/components/GemSuspense/GemSuspense';

interface IComicFrame {
  style: CSSProperties;
  image: TImagePath;
  border: boolean;
  onAnimationComplete;
  hideInstantly: boolean;
}

const ComicFrame: React.FC<IComicFrame> = ({image, style, border, onAnimationComplete, hideInstantly}) => {
  const combinedStyles = {
    ...style,
    backgroundImage: `url(${image})`,
  };

  // the same as UIWindow
  const [ready, setReady] = useState(true); // when false we cannot animate when no Suspense
  return (
    <GemSuspense onReady={setReady} kind="ui">
      <PreloadImage image={image} />
      <motion.div
        className={styles.root}
        style={combinedStyles}
        initial="hidden"
        animate={!ready ? 'hidden' : 'visible'}
        exit="hidden"
        variants={hideInstantly ? showImageHideInstantlyVariants : showImageVariants}
        onAnimationComplete={definition => {
          if (ready) {
            onAnimationComplete(definition);
          }
        }}
      >
        {border && <div className={styles.border} />}
      </motion.div>
    </GemSuspense>
  );
};

export default ComicFrame;
