import React, {useCallback, useEffect} from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './styles/SceneStyle.scss';
import {batch} from 'react-redux';
import {ISceneId} from '../../game/scenes';
import PreloadImage from '../Preload/PreloadImage';
import {useTypedDispatch} from '../redux/store';
import {sceneVariants} from '../commons/motion/variants';
import {setSceneMultiState} from '../redux/worldSlice';
import {setNextSceneId} from '../redux/tempSlice';
import {setCurrentScene} from '../redux/gemSlice';

type IImage = string;

interface IScene {
  id: ISceneId;
  image: IImage;
}

const Scene: React.FC<IScene> = props => {
  const {id, image, children} = props;
  const dispatch = useTypedDispatch();

  const classes = classNames('Scene', `Scene-${id}`);

  useEffect(() => {
    console.log('%c [mr] SCENE created', 'background-color:Gold; color: black', id);
  }, [id]);

  const onAnimationComplete = useCallback(() => {
    // TODO put into thunk!
    batch(() => {
      dispatch(setSceneMultiState({sceneId: id, stateToUpdate: {visited: true}}));
      dispatch(setNextSceneId(null));
      dispatch(setCurrentScene(id));
    });
  }, [id, dispatch]);

  const styles = {
    backgroundImage: `url(${image})`,
  };

  // TODO? do we need exit animation here?

  return (
    <motion.div
      className={classes}
      style={styles}
      initial="hidden"
      animate="visible"
      variants={sceneVariants}
      onAnimationComplete={onAnimationComplete}
    >
      <PreloadImage image={image} />
      {children}
    </motion.div>
  );
};

export default Scene;
