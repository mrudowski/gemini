import React from 'react';
import classNames from 'classnames';
import './styles/SceneStyle.scss';
import imageCache from '../imageCache';

type TSceneId = string; // TODO better?
type TImagePath = string;

interface IScene {
  id: TSceneId,
  imagePath: TImagePath //TODO change to image
}

const Scene: React.FC<IScene> = (props) => {
  const {
    id,
    imagePath,
    children
  } = props;

  const classes = classNames(
    'Scene',
    `Scene-${id}`,
  );

  // will throw promise - which works with suspens and suspend component till
  imageCache.preload(imagePath);

  const styles = {
    backgroundImage: `url(${imagePath})`
  };

  return (
    <div
      className={classes}
      style={styles}
    >
      {children}
    </div>
  );

};

export default Scene;
