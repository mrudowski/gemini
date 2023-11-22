import React, {FC, useCallback} from 'react';
import './styles/SceneAnimation.scss';
import {motion} from 'framer-motion';
import {sceneVariants} from '../../commons/motion/variants';
import {useTypedDispatch, useTypedSelector} from '../../redux/store';
import {ISceneId} from '../Scene/types';
import {getForceSceneUpdater, getIsSceneReady} from '../../redux/tempSliceSelectors';
import {onSceneOnAnimationComplete} from '../../actions/gotoScene/gotoSceneActionThunk';

interface ISceneAnimation {
  loaded: boolean;
  nextSceneId: ISceneId;
}

const SceneAnimation: FC<ISceneAnimation> = ({children, loaded, nextSceneId}) => {
  const dispatch = useTypedDispatch();
  const sceneReady = useTypedSelector(state => getIsSceneReady(state, nextSceneId));
  const forceSceneUpdater = useTypedSelector(getForceSceneUpdater);

  const onAnimationComplete = useCallback(
    definition => {
      if (definition === 'fadingIn') {
        dispatch(onSceneOnAnimationComplete(nextSceneId));
      }
    },
    [nextSceneId, dispatch]
  );

  return (
    <motion.div
      className="SceneAnimation"
      initial={false}
      animate={!loaded ? 'hidden' : sceneReady ? 'stable' : 'fadingIn'}
      variants={sceneVariants}
      // exit={{opacity: 0.5}}
      onAnimationComplete={onAnimationComplete}
      key={forceSceneUpdater}
    >
      {children}
    </motion.div>
  );
};

export default SceneAnimation;
