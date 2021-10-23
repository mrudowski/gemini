import React, {useCallback, useEffect} from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import './styles/SceneStyle.scss';
import {batch} from 'react-redux';
import {ISceneId} from '../../game/scenes';
import PreloadImage from '../Preload/PreloadImage';
import {useTypedDispatch, useTypedSelector} from '../redux/store';
import {sceneVariants} from '../commons/motion/variants';
import {setSceneMultiState} from '../redux/worldSlice';
import {setNextSceneId} from '../redux/tempSlice';
import {getCurrentSceneId, setCurrentScene} from '../redux/gemSlice';

type IImage = string;

interface IScene {
  id: ISceneId;
  image: IImage;
  loaded?: boolean;
}

const Scene: React.FC<IScene> = props => {
  const {id, image, loaded, children} = props;
  const dispatch = useTypedDispatch();
  const currentSceneId = useTypedSelector(getCurrentSceneId);

  const classes = classNames('Scene', `Scene-${id}`);

  useEffect(() => {
    console.log('%c [mr] SCENE created', 'background-color:Gold; color: black', id);
  }, [id]);

  const onAnimationComplete = useCallback(() => {
    console.log('%c [mr] onAnimationComplete', 'background-color:Gold; color: black');

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

  useEffect(() => {
    console.log('%c [mr] useEffect when', 'background-color:Gold; color: black');
  }, []);

  // TODO to sie zaczyna szybciej niz się wgra... bo każdy poi opoznia
  // a animacja leci...

  // TODO detect if we are suspense?

  console.log(
    '%c [mr] onAnimationStart result',
    'background-color:orange; color: black',
    loaded,
    id,
    !loaded ? 'hidden' : currentSceneId === id ? 'fullyLoaded' : 'visible'
  );

  return (
    <>
      <PreloadImage image={image} />
      <motion.div
        className="SceneAnim"
        initial={false} //"hidden1" // TODO here
        animate={!loaded ? 'notLoaded' : currentSceneId === id ? 'fullyLoaded' : 'visible'}
        variants={sceneVariants}
        //exit={{opacity: 0.5}}
        // onAnimationStart={() => {
        //   console.log('%c [mr] onAnimationStart', 'background-color:Gold; color: black');
        // }}
        onAnimationComplete={onAnimationComplete}
      >
        <div className={classes} style={styles}>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Scene;
