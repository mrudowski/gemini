import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState} from '../../redux/store';
import {turnOffGemLock, turnOnGemLock} from '../../redux/tempSlice';
import {IDuration} from '../types';
import {IShakeCameraAction} from './shakeCameraTypes';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';

interface IShakeCameraActionState {
  active: boolean;
  duration: IDuration;
}

const initialState: IShakeCameraActionState = {
  active: false,
  duration: 1,
};

const shakeCameraActionSlice = createSlice({
  name: 'shakeCameraAction',
  initialState,
  reducers: {
    startShakeCameraAction: (state: IShakeCameraActionState, action: PayloadAction<ReturnType<IShakeCameraAction>>) => {
      const {duration = initialState.duration} = action.payload.payload || {};
      state.duration = duration;
      state.active = true;
    },
    endShakeCameraAction: () => {
      return initialState;
    },
  },
});

export default shakeCameraActionSlice.reducer;

// ------------ thunks

export const startShakeCameraAction = (action: ReturnType<IShakeCameraAction>) => dispatch => {
  batch(() => {
    dispatch(shakeCameraActionSlice.actions.startShakeCameraAction(action));
    const {duration = 1} = action.payload;
    dispatch(turnOnGemLock());
    setTimeout(() => {
      batch(() => {
        dispatch(endAction());
      });
    }, duration * 1000);
  });
};

export const endShakeCameraAction = () => dispatch => {
  batch(() => {
    dispatch(shakeCameraActionSlice.actions.endShakeCameraAction());
    dispatch(turnOffGemLock());
  });
};

// ------------ selectors

export const isShakeCameraActive = createSelector(
  [(state: IRootState) => state.shakeCameraAction],
  shakeCameraActionState => shakeCameraActionState.active
);
