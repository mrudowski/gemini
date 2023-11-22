import {batch} from 'react-redux';
import {IThunk} from '../../redux/store';
import {
  pauseScene,
  setCurrentSceneId,
  setGemReady,
  setNextSceneId,
  turnOffGemLock,
  turnOnGemLock,
} from '../../redux/tempSlice';
import {getIsGemReady} from '../../redux/tempSliceSelectors';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {IStartGotoSceneAction} from './gotoSceneTypes';
import {ISceneId} from '../../scene/Scene/types';

export const startGotoSceneAction: IStartGotoSceneAction = action => dispatch => {
  // console.log('%c [mr] startGotoSceneAction', 'background-color:Gold; color: black', action);

  const {
    payload: {scene: sceneId, pause},
  } = action;

  if (!sceneId) {
    throw new Error('required "sceneId" not defined for the action');
  }

  batch(() => {
    dispatch(setNextSceneId(sceneId));
    if (pause) {
      dispatch(pauseScene(sceneId));
    }
    dispatch(turnOnGemLock());
  });
};

export const endGotoSceneAction = (): IThunk => () => {
  // nothing here because we've done everything in `onSceneOnAnimationComplete`
};

/**
 * we use proxy here instead directly call `endAction` because we want to set `nextSceneId`
 */
export const onSceneOnAnimationComplete =
  (nextSceneId: ISceneId): IThunk =>
  (dispatch, getState) => {
    batch(() => {
      dispatch(setNextSceneId(null));
      dispatch(setCurrentSceneId(nextSceneId));
      // only once per game
      if (!getIsGemReady(getState())) {
        dispatch(setGemReady());
      }
      dispatch(turnOffGemLock());
      // real endAction here
      dispatch(endAction());
    });
  };
