import React, {useCallback, useEffect, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import {getImagesToShowAsArray} from '../actions/showImage/showImageActionSlice';
import {showImageVariants} from '../commons/motion/variants';
import Backdrop from '../commons/components/Backdrop';
import ComicFrame from './components/ComicFrame/ComicFrame';

interface IShowImage {}

const ShowImage: React.FC<IShowImage> = () => {
  const images = useTypedSelector(getImagesToShowAsArray);
  const imagesAmount = images.length;
  const hasImages = imagesAmount > 0;
  const dimmedBackdrop = images.some(image => image.payload.dimmedBackdrop);
  const dispatch = useTypedDispatch();
  const prevImagesAmountRef = useRef(0);
  const hideMoreThenOneImage = useRef(false);
  const hideEndActionPossibleRef = useRef(true);

  useEffect(() => {
    // detect if we hide more than one image
    if (imagesAmount === 0 && prevImagesAmountRef.current > 1) {
      hideMoreThenOneImage.current = true;
    } else {
      hideMoreThenOneImage.current = false;
    }
    prevImagesAmountRef.current = imagesAmount;
    hideEndActionPossibleRef.current = true;
  }, [imagesAmount]);

  const onAnimationComplete = useCallback(
    definition => {
      // visible and on hidden
      // console.log('%c [mr] onAnimationComplete def', 'background-color:deeppink; color: black', definition);
      if (definition === 'visible') {
        dispatch(endAction());
      } else {
        // // we want to call `end` only once (even if we hide many images at once)
        if (hideMoreThenOneImage.current) {
          // so we use semaphore here
          if (hideEndActionPossibleRef.current) {
            hideEndActionPossibleRef.current = false;
            dispatch(endAction());
          }
        } else {
          dispatch(endAction());
        }
      }
    },
    [dispatch]
  );

  // TODO Backdrop with Anime --- new component?

  return (
    <AnimatePresence>
      {hasImages && (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={showImageVariants}>
          <Backdrop dimmed={dimmedBackdrop} />
        </motion.div>
      )}
      {images.map(image => (
        <ComicFrame
          key={image.payload.image}
          image={image.payload.image}
          style={image.payload.style}
          hideInstantly={image.payload.hideInstantly || false}
          border={image.payload.border || false}
          onAnimationComplete={onAnimationComplete}
        />
      ))}
    </AnimatePresence>
  );
};

export default ShowImage;
