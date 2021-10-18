import React, {useEffect} from 'react';
import classNames from 'classnames';
import './styles/SceneStyle.scss';
import {ISceneId} from '../../game/scenes';
import PreloadImage from '../Preload/PreloadImage';

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

  const styles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={classes} style={styles}>
      <PreloadImage image={image} />
      {children}
    </div>
  );
};

export default Scene;
