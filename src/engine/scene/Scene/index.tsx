import React, {useEffect} from 'react';
import classNames from 'classnames';
import _isEqual from 'lodash.isequal';
import './styles/SceneStyle.scss';
import PreloadImage from '../../Preload/PreloadImage';
import {useTypedDispatch, useTypedSelector} from '../../redux/store';
import {ISceneId, IScriptMetaWrapper} from './types';
import {ISoundId} from '../../sound/soundSlice';
import useCustomCompareEffect from '../../commons/hooks/useCustomCompareEffect';
import {playBgSounds} from '../../sound/soundApi';
import {IHudId} from '../../Hud/hudSlice';
import {getIsSceneReadyAndActive} from '../../redux/tempSliceSelectors';
import useOnEnter from './hooks/useOnEnter';
import useOnBeforeEnter from './hooks/useOnBeforeEnter';
import {IImage} from '../../Preload/types';
import {showHudThunk} from '../../Hud/hudThunks';
import {getLookCloserSceneId} from '../../closeup/CloseupViewer/lookCloserActionSlice';

export interface IScene {
  id: ISceneId;
  image?: IImage;
  onBeforeEnter?: IScriptMetaWrapper[];
  onEnter?: IScriptMetaWrapper[];
  onEnterInternalAction?: () => void;
  sounds?: ISoundId[];
  hideHud?: boolean | IHudId[];
}

const Scene: React.FC<IScene> = ({
  id,
  image,
  children,
  onBeforeEnter,
  onEnter,
  onEnterInternalAction,
  sounds = [],
  hideHud = false,
}) => {
  const dispatch = useTypedDispatch();
  const sceneReadyAndActive = useTypedSelector(state => getIsSceneReadyAndActive(state, id));
  const sceneWithCloseup = !!useTypedSelector(getLookCloserSceneId);

  const classes = classNames('Scene', `Scene-${id}`, sceneWithCloseup && 'Scene--withCloseup');

  useEffect(() => {
    console.log('%c 🏙 SCENE created', 'background-color:black; color: YellowGreen', id);
    return () => {
      console.log('%c 🏙 SCENE destroyed', 'background-color:black; color: YellowGreen', id);
    };
  }, [id, dispatch]);

  useCustomCompareEffect(
    () => {
      dispatch(showHudThunk(hideHud));
    },
    hideHud,
    _isEqual
  );

  useOnBeforeEnter({onBeforeEnter, ready: true, id});

  useCustomCompareEffect(
    () => {
      // console.log('%c 🏙 SCENE useEffect sounds', 'background-color:black; color: YellowGreen', sounds);
      playBgSounds(sounds);
    },
    sounds,
    _isEqual
  );

  useOnEnter({
    onEnter,
    onEnterInternalAction,
    ready: sceneReadyAndActive,
    id,
  });

  const styles = {
    backgroundImage: image ? `url(${image})` : 'none',
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

export default Scene;
