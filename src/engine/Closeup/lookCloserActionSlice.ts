import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from '../redux/store';
import {ISceneId} from '../../game/scenes';
import {ILookCloserActionPayload, ISpecifiedAction} from '../actions';

interface ILookCloserActionState {
  sceneId: ISceneId | null;
}

const initialState: ILookCloserActionState = {
  sceneId: null,
};

const lookCloserActionSlice = createSlice({
  name: 'closeup',
  initialState,
  reducers: {
    startLookCloserAction: (
      state: ILookCloserActionState,
      action: PayloadAction<{action: ISpecifiedAction<ILookCloserActionPayload>}>
    ) => {
      const sceneId = action.payload.action.payload.scene;
      state.sceneId = sceneId;
    },
    endLookCloserAction: () => {
      // do nothing
    },
    startCloseCloseupAction: (state: ILookCloserActionState) => {
      state.sceneId = null;
    },
    endCloseCloseupAction: () => {
      // do nothing
    },
  },
});

export default lookCloserActionSlice.reducer;

export const startLookCloserAction = lookCloserActionSlice.actions.startLookCloserAction;
export const endLookCloserAction = lookCloserActionSlice.actions.endLookCloserAction;
export const startCloseCloseupAction = lookCloserActionSlice.actions.startCloseCloseupAction;
export const endCloseCloseupAction = lookCloserActionSlice.actions.endCloseCloseupAction;

// ------------ selectors

export const getLookCloserSceneId = (state: IRootState) => state.lookCloserAction.sceneId;
