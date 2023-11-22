import {batch} from 'react-redux';
import {IThunk} from './store';
import {getLastSavedSceneId, resetWorldState, restoreWorldState} from '../World/worldSlice';
import {resetInventoryState, restoreInventoryState} from '../Inventory/inventorySlice';
import SETTINGS from '../../game/settings';
import {ISceneId} from '../scene/Scene/types';
import {IGameStateToRestore} from './types';
import {playScript} from '../scriptPlayer/scriptPlayerSlice';
import ACTIONS from '../actions/actions';
import {resetNotebookState, restoreNotebookState} from '../notebook/notebookSlice';
import {forceSceneUpdate} from './tempSlice';
import {saveCurrentGame} from '../Gem/gemSlice';
import {getLookCloserSceneId} from '../closeup/CloseupViewer/lookCloserActionSlice';

export const resetAllState = (): IThunk => dispatch => {
  batch(() => {
    // dispatch(resetGemState()); we don't do it - it's the game options
    dispatch(resetWorldState());
    dispatch(resetInventoryState());
    dispatch(resetNotebookState());
    dispatch(saveCurrentGame());
  });
};

// TODO Marcin: move to mainMenu etc.
const gotoSceneFromMainMenuThunk =
  (sceneId: ISceneId): IThunk =>
  dispatch => {
    dispatch(
      playScript({
        script: [
          ACTIONS.switchLightOff({level: 'app'}),
          ACTIONS.gotoScene({scene: sceneId, pause: false}),
          ACTIONS.switchLightOn({level: 'app'}),
          ACTIONS.resumeScene(),
        ],
      })
    );
  };

export const continueGameThunk = (): IThunk => (dispatch, getState) => {
  const lastSavedSceneId: ISceneId = getLastSavedSceneId(getState());
  dispatch(gotoSceneFromMainMenuThunk(lastSavedSceneId));
};

export const startNewGameThunk = (): IThunk => dispatch => {
  batch(() => {
    dispatch(resetAllState());
    dispatch(gotoSceneFromMainMenuThunk(SETTINGS.FIRST_SCENE));
  });
};

const restoreAllStateThunk =
  (gameStateToRestore: IGameStateToRestore): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(restoreWorldState(gameStateToRestore.world));
      dispatch(restoreInventoryState(gameStateToRestore.inventory));
      dispatch(restoreNotebookState(gameStateToRestore.notebook));
      dispatch(saveCurrentGame());
    });
  };

export const restoreGameThunk =
  (gameStateToRestore: IGameStateToRestore): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(restoreAllStateThunk(gameStateToRestore));
      dispatch(continueGameThunk());
    });
  };

export const restoreGameFromSnapshotThunk =
  (gameStateToRestore: IGameStateToRestore): IThunk =>
  (dispatch, getState) => {
    const lastSavedSceneId: ISceneId = getLastSavedSceneId(getState());
    const sceneIdToRestore: ISceneId = gameStateToRestore.world.currentSceneId;
    batch(() => {
      dispatch(restoreAllStateThunk(gameStateToRestore));
      if (lastSavedSceneId !== sceneIdToRestore) {
        dispatch(
          playScript({
            script: [ACTIONS.gotoScene({scene: sceneIdToRestore})],
          })
        );
      } else {
        dispatch(forceSceneUpdate());
      }
    });
  };

export const exitToTitleThunk = (): IThunk => (dispatch, getState) => {
  const lookCloserActive = !!getLookCloserSceneId(getState());

  dispatch(
    playScript({
      script: [...(lookCloserActive ? [ACTIONS.closeCloseup()] : []), ACTIONS.gotoScene({scene: SETTINGS.MAIN_SCENE})],
    })
  );
};
