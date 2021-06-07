import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import _set from 'lodash.set';
import {IRootState} from './store';
import {getCurrentSceneId} from './gemSlice';
import {IWorldState, worldInitialState} from '../../sampleGame01/worldState'; // TODO... should be injected


const worldSlice = createSlice({
  name: 'world',
  initialState: worldInitialState,
  reducers: {
    setWorldState: (state: IWorldState, action: PayloadAction<{statePath: string | string[], stateValue: unknown}>) => {
      // get global with help of trunk... but here we still don't need
      const {statePath, stateValue} = action.payload;
      _set(state, statePath, stateValue);
    },
    setSceneState: (state: IWorldState, action: PayloadAction<{sceneId: string, stateName: string, stateValue: unknown}>) => {
      const {sceneId, stateName, stateValue} = action.payload;
      state.scenes[sceneId][stateName] = stateValue;
    },
  }
});

export default worldSlice.reducer;

export const setWorldState = worldSlice.actions.setWorldState;
export const setSceneState = worldSlice.actions.setSceneState;

// selectors

export const getWorldState = (state: IRootState) => state.world;
const getScenes = (state: IRootState) => state.world.scenes;
export const getActors = (state: IRootState) => state.world.actors;

export const getCurrentSceneState = createSelector(
  [getScenes, getCurrentSceneId],
  (scenes, currentSceneId) => {
    return scenes[currentSceneId];
  }
);
