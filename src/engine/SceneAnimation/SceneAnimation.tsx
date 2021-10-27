import React, {FC, useCallback} from 'react';
import './styles/SceneAnimation.scss';
import {motion} from 'framer-motion';
import {batch} from 'react-redux';
import {sceneVariants} from '../commons/motion/variants';
import {setSceneMultiState} from '../redux/worldSlice';
import {setNextSceneId} from '../redux/tempSlice';
import {getCurrentSceneId, setCurrentScene} from '../redux/gemSlice';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {ISceneId} from '../../game/scenes';

interface ISceneAnimation {
  loaded: boolean;
  nextSceneId: ISceneId;
  id;
}

const SceneAnimation: FC<ISceneAnimation> = ({children, loaded, nextSceneId, id}) => {
  const dispatch = useTypedDispatch();
  const currentSceneId = useTypedSelector(getCurrentSceneId);

  const onAnimationComplete = useCallback(() => {
    // TODO put into thunk!
    batch(() => {
      dispatch(setSceneMultiState({sceneId: nextSceneId, stateToUpdate: {visited: true}}));
      dispatch(setNextSceneId(null));
      dispatch(setCurrentScene(nextSceneId));
    });
  }, [nextSceneId, dispatch]);

  return (
    <motion.div
      id={id}
      className="SceneAnimation"
      initial={false}
      animate={!loaded ? 'hidden' : currentSceneId === nextSceneId ? 'stable' : 'fadingIn'}
      variants={sceneVariants}
      //exit={{opacity: 0.5}}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

export default SceneAnimation;
