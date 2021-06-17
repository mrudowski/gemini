import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import _set from 'lodash.set';
import {IRootState} from './store';
import {getCurrentSceneId} from './gemSlice';
import {IWorldState, worldInitialState} from '../../game/worldState';
import {IActorId} from '../../game/actors';
import {ITalkOptionId} from '../../game/talkOptions'; // TODO... should be injected


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
    markActorTalkOptionAsAsked: (state: IWorldState, action: PayloadAction<{actorId: IActorId, optionId: ITalkOptionId}>) => {
      const {actorId, optionId} = action.payload;
      state.actors[actorId][optionId] = true;
    },
  }
});

export default worldSlice.reducer;

export const setWorldState = worldSlice.actions.setWorldState;
export const setSceneState = worldSlice.actions.setSceneState;
export const markActorTalkOptionAsAsked = worldSlice.actions.markActorTalkOptionAsAsked;

// selectors

export const getWorldState = (state: IRootState) => state.world;
const getScenes = (state: IRootState) => state.world.scenes;
export const getActorsState = (state: IRootState) => state.world.actors;
export const getTalkOptions = (state: IRootState) => state.world.talkOptions;

export const getCurrentSceneState = createSelector(
  [getScenes, getCurrentSceneId],
  (scenes, currentSceneId) => {
    return scenes[currentSceneId];
  }
);

export const getActorState = (actorId: IActorId) => createSelector(
  [getActorsState],
  (actors) => {
    return actors[actorId];
  }
);
