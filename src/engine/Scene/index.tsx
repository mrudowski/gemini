import React, {useEffect} from 'react';
import classNames from 'classnames';
import './styles/SceneStyle.scss';
import imageCache from '../imageCache';
import {ISceneId} from '../../game/scenes';

type IImage = string;

interface IScene {
  id: ISceneId;
  image: IImage;
}

const Scene: React.FC<IScene> = props => {
  const {id, image, children} = props;

  const classes = classNames('Scene', `Scene-${id}`);

  useEffect(() => {
    console.log('%c [mr] SCENE created', 'background-color:Gold; color: black', id);
  }, [id]);

  // will throw promise - which works with suspens and suspend component till
  imageCache.preload(image);

  const styles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={classes} style={styles}>
      {children}
    </div>
  );
};

export default Scene;
