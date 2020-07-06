import React from 'react';
import classNames from 'classnames';
import './styles/sceneStyle.scss'

type TSceneId = string; // TODO better?
type TImagePath = string;

interface IScene {
  id: TSceneId,
  imagePath?: TImagePath
}

const Scene: React.FC<IScene> = (props) => {
  const {
    id,
    imagePath
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
    </div>
  );

}

export default Scene;
