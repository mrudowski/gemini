import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';
import {getCurrentSceneId} from './gemSlice';
import {IWorldState, worldInitialState} from '../../sampleGame01/worldState'; // TODO... should be injected


const worldSlice = createSlice({
  name: 'world',
  initialState: worldInitialState,
  reducers: {
    setSceneState: (state: IWorldState, action: PayloadAction<{sceneId: string, newState: any}>) => {
      // get global with help of trunk...
      const {sceneId, newState} = action.payload;
      state.scenes[sceneId] = {
        ...state.scenes[sceneId],
        newState
      };
    },
  }
});

export default worldSlice.reducer;

export const getWorldState = (state: IRootState) => state.world;
export const getScenes = (state: IRootState) => state.world.scenes;

export const getCurrentSceneState = createSelector(
  [getScenes, getCurrentSceneId],
  (scenes, currentSceneId) => {
    return scenes[currentSceneId];
  }
);
