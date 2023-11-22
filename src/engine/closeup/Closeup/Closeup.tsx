import React from 'react';
import classNames from 'classnames';
import './styles/CloseupStyle.scss';
import PreloadImage from '../../Preload/PreloadImage';
import {IScene} from '../../scene/Scene';
import {getIsLookCloserSceneReady} from '../CloseupViewer/lookCloserActionSlice';
import {ICloseupId} from './types';
import useOnEnter from '../../scene/Scene/hooks/useOnEnter';
import useOnBeforeEnter from '../../scene/Scene/hooks/useOnBeforeEnter';
import {useTypedSelector} from '../../redux/store';

interface ICloseup extends Omit<IScene, 'id'> {
  id: ICloseupId;
}

const Closeup: React.FC<ICloseup> = ({id, image, children, onBeforeEnter, onEnter, onEnterInternalAction}) => {
  const isLookCloserSceneReady = useTypedSelector(getIsLookCloserSceneReady);

  const classes = classNames('Closeup', `Closeup-${id}`);

  useOnBeforeEnter({onBeforeEnter, ready: true, id});

  useOnEnter({
    onEnter,
    onEnterInternalAction,
    ready: isLookCloserSceneReady,
    id,
  });

  const styles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <>
      {image && <PreloadImage image={image} />}
      <div className={classes} style={styles}>
        {children}
      </div>
    </>
  );
};

export default Closeup;
