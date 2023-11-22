import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import _set from 'lodash.set';
import merge from 'lodash.merge';
// import _get from 'lodash.get';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../redux/store';
import {IWorldState, worldInitialState} from '../../game/worldState';
import {IActorId, ITalkOptionId} from '../Dialogue/types';
import {ISceneId} from '../scene/Scene/types';
import {ICloseupId} from '../closeup/Closeup/types';
import SETTINGS from '../../game/settings';
import {saveCurrentGame} from '../Gem/gemSlice';
import {updateStats} from '../stats/updateStats';

// TODO move to world feature folder?

const worldSlice = createSlice({
  name: 'world',
  initialState: worldInitialState,
  reducers: {
    // used by devtools
    setWorldStateInDevTools: (
      state: IWorldState,
      action: PayloadAction<{statePath: string | string[]; stateValue: unknown}>
    ) => {
      // get global with help of trunk... but here we still don't need
      const {statePath, stateValue} = action.payload;
      _set(state, statePath, stateValue);
    },
    // setWorldMultiState: (state: IWorldState, action: PayloadAction<{stateToUpdate: {[key: string]: unknown}}>) => {
    //   const {stateToUpdate} = action.payload;
    //   return {
    //     ...state,
    //     ...stateToUpdate,
    //   };
    // },
    setGlobalMultiState: (state: IWorldState, action: PayloadAction<{stateToUpdate: {[key: string]: unknown}}>) => {
      const {stateToUpdate} = action.payload;
      state.global = {
        ...state.global,
        ...stateToUpdate,
      };
    },
    // not used
    // setSceneState: (
    //   state: IWorldState,
    //   action: PayloadAction<{sceneId: string; stateName: string; stateValue: unknown}>
    // ) => {
    //   const {sceneId, stateName, stateValue} = action.payload;
    //   state.scenes[sceneId][stateName] = stateValue;
    // },
    setSceneMultiState: (
      state: IWorldState,
      action: PayloadAction<{sceneId: string; stateToUpdate: {[key: string]: unknown}}>
    ) => {
      const {sceneId, stateToUpdate} = action.payload;
      state.scenes[sceneId] = {
        ...state.scenes[sceneId],
        ...stateToUpdate,
      };
    },
    markActorTalkOptionAsAsked: (
      state: IWorldState,
      action: PayloadAction<{actorId: IActorId; optionId: ITalkOptionId}>
    ) => {
      const {actorId, optionId} = action.payload;
      state.actors[actorId][optionId as string] = true;
    },
    // saveActorLastLocationBeforeSwitch: (
    //   state: IWorldState,
    //   action: PayloadAction<{actorId: IActorId; sceneId: ISceneId}>
    // ) => {
    //   const {actorId, sceneId} = action.payload;
    //   state.actors[actorId].lastLocation = sceneId;
    // },
    setCurrentSceneId: (state: IWorldState, action: PayloadAction<ISceneId>) => {
      state.previousSceneId = state.currentSceneId;
      state.currentSceneId = action.payload;
    },
    setCurrentActorId: (state: IWorldState, action: PayloadAction<IActorId>) => {
      const actorId = action.payload;
      state.currentActorId = actorId;
    },
    restoreWorldState: (state: IWorldState, action: PayloadAction<IWorldState>) => {
      // good for development, when still adding new things
      return merge({}, worldInitialState, action.payload);
    },
    resetWorldState: () => {
      return worldInitialState;
    },
  },
});

export default worldSlice.reducer;

// thunks
// ------------------------------------------

// used by devtools only
export const setWorldStateInDevTools =
  (args: {statePath: string | string[]; stateValue: unknown}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.setWorldStateInDevTools(args));
      dispatch(saveCurrentGame());
    });
  };

/**
 * used by
 * - startSetGlobalStateAction (primary role)
 * - scriptPlayer as hack to executeScriptAsOneSingleNotBlockingAction
 * - herbarium, notebook (changePage)
 */
export const setGlobalMultiState =
  (args: {stateToUpdate: {[key: string]: unknown}}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.setGlobalMultiState(args));
    });
  };
// not used
// const setSceneState =
//   (args: {sceneId: string; stateName: string; stateValue: unknown}): IThunk =>
//   dispatch => {
//     batch(() => {
//       dispatch(worldSlice.actions.setSceneState(args));
//       dispatch(setSaveDate());
//     });
//   };

/**
 * used by
 * - startSetSceneStateAction (primary role)
 * - scriptPlayer as hack to executeScriptAsOneSingleNotBlockingAction
 * - in game in some special cases (hacks)
 */
export const setSceneMultiState =
  (args: {sceneId: string; stateToUpdate: {[key: string]: unknown}}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.setSceneMultiState(args));
    });
  };

export const markActorTalkOptionAsAsked =
  (args: {actorId: IActorId; optionId: ITalkOptionId}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.markActorTalkOptionAsAsked(args));
    });
  };

export const saveCurrentSceneId =
  (sceneId: ISceneId): IThunk =>
  (dispatch, getState) => {
    const state = getState();
    const lastSavedSceneId = getLastSavedSceneId(state);
    if (lastSavedSceneId !== sceneId) {
      batch(() => {
        dispatch(worldSlice.actions.setCurrentSceneId(sceneId));
      });
    }
    updateStats(sceneId);
  };
export const setCurrentActorId =
  (actorId: IActorId): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.setCurrentActorId(actorId));
    });
  };
export const restoreWorldState =
  (worldState: IWorldState): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(worldSlice.actions.restoreWorldState(worldState));
    });
  };
export const resetWorldState = (): IThunk => dispatch => {
  batch(() => {
    dispatch(worldSlice.actions.resetWorldState());
  });
};

// selectors
// ------------------------------------------

export const getWorldState = (state: IRootState) => state.world;
const getScenes = (state: IRootState) => state.world.scenes;
export const getCurrentActorId = (state: IRootState) => state.world.currentActorId;
export const getPreviousSceneId = (state: IRootState) => state.world.previousSceneId;
export const getActorsState = (state: IRootState) => state.world.actors;

// export const getStateByPathUtil = (worldState: IRootState['world'], path: string) => _get(worldState, path);

// not used
// export const getStateByPath = (path: string) =>
//   createSelector([getWorldState], worldState => {
//     return getStateByPathUtil(worldState, path);
//   });

// not used
// export const getCurrentSceneState = createSelector([getScenes, getCurrentSceneId], (scenes, currentSceneId) => {
//   return scenes[currentSceneId];
// });

export const getSceneState = createSelector(
  [getScenes, (state: IRootState, sceneId: ISceneId | ICloseupId) => sceneId],
  (scenes, sceneId) => {
    return scenes[sceneId] as IWorldState['scenes'][typeof sceneId];
  }
);

export const getGlobalState = createSelector([getWorldState], worldState => {
  return worldState.global;
});

export const getActorState = createSelector(
  [getActorsState, (state: IRootState, actorId: IActorId) => actorId],
  (actors, actorId) => {
    return actors[actorId];
  }
);

export const getLastSavedSceneId = (state: IRootState) => state.world.currentSceneId;

export const getIsFirstGame = createSelector([getLastSavedSceneId], lastSavedSceneId => {
  return lastSavedSceneId === SETTINGS.INTRO_SCENE;
});
