import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../../redux/store';
import {ISpecifiedAction} from '../../actions/types';
import {ICloseupId} from '../Closeup/types';
import {turnOffGemLock, turnOnGemLock} from '../../redux/tempSlice';
import {ILookCloserActionPayload} from '../../actions/lookCloser/lookCloser';

interface ILookCloserActionState {
  ready: boolean;
  sceneId: ICloseupId | null;
}

const initialState: ILookCloserActionState = {
  ready: false,
  sceneId: null,
};

const lookCloserActionSlice = createSlice({
  name: 'closeup',
  initialState,
  reducers: {
    startLookCloserAction: (
      state: ILookCloserActionState,
      action: PayloadAction<ISpecifiedAction<ILookCloserActionPayload>>
    ) => {
      const sceneId = action.payload.payload.scene;
      state.ready = false;
      state.sceneId = sceneId;
    },
    endLookCloserActionPrivate: (state: ILookCloserActionState) => {
      state.ready = true;
    },
    startCloseCloseupAction: (state: ILookCloserActionState) => {
      state.sceneId = null;
      state.ready = false;
    },
  },
});

export default lookCloserActionSlice.reducer;

const startLookCloserActionPrivate = lookCloserActionSlice.actions.startLookCloserAction;
const endLookCloserActionPrivate = lookCloserActionSlice.actions.endLookCloserActionPrivate;
export const startCloseCloseupActionPrivate = lookCloserActionSlice.actions.startCloseCloseupAction;

// ------------ thunks

export const startLookCloserAction =
  (action: ISpecifiedAction<ILookCloserActionPayload>): IThunk =>
  dispatch => {
    dispatch(turnOnGemLock());
    // some delay on start
    setTimeout(() => {
      dispatch(startLookCloserActionPrivate(action));
    }, 500);
  };

export const endLookCloserAction = (): IThunk => dispatch => {
  // some delay on start
  setTimeout(() => {
    batch(() => {
      dispatch(endLookCloserActionPrivate());
      dispatch(turnOffGemLock());
    });
  }, 500);
};

// ---

export const startCloseCloseupAction = (): IThunk => dispatch => {
  batch(() => {
    dispatch(turnOnGemLock());
    dispatch(startCloseCloseupActionPrivate());
  });
};

export const endCloseCloseupAction = (): IThunk => dispatch => {
  dispatch(turnOffGemLock());
};

// ------------ selectors

export const getLookCloserSceneId = (state: IRootState) => state.lookCloserAction.sceneId;
export const getIsLookCloserSceneReady = (state: IRootState) => state.lookCloserAction.ready;
