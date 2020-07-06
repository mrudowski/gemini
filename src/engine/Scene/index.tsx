import React from 'react';
import classNames from 'classnames';
import './styles/sceneStyle.scss'

type TSceneId = string; // TODO better?
type TImagePath = string;

interface IScene {
  id: TSceneId,
  imagePath?: TImagePath //TODO change to image
}

const Scene: React.FC<IScene> = (props) => {
  const {
    id,
    imagePath,
    children
  } = props;

  const classes = classNames(
    'Scene',
    `Scene-${id}`
  );

  const styles = {
    backgroundImage: `url(${imagePath})`
  }

  return (
    <div
      className={classes}
      style={styles}
    >
      {children}
    </div>
  );

}

export default Scene;
