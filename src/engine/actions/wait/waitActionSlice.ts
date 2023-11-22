import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IThunk} from '../../redux/store';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {turnOffGemLock, turnOnGemLock} from '../../redux/tempSlice';
import {IWaitAction} from './waitTypes';

export type IWaitActionReturnType = ReturnType<IWaitAction>;

interface IWaitActionState {
  action: IWaitActionReturnType | null;
}

const initialState: IWaitActionState = {
  action: null,
};

const waitActionSlice = createSlice({
  name: 'waitAction',
  initialState,
  reducers: {
    startWaitActionPrivate: (state: IWaitActionState, action: PayloadAction<IWaitActionReturnType>) => {
      state.action = action.payload;
    },
    endWaitAction: (state: IWaitActionState) => {
      state.action = null;
    },
  },
});

export default waitActionSlice.reducer;

const startWaitActionPrivate = waitActionSlice.actions.startWaitActionPrivate;
export const endWaitAction = waitActionSlice.actions.endWaitAction;

// ------------ thunk

export const startWaitAction =
  (action: IWaitActionReturnType): IThunk =>
  dispatch => {
    const {duration = 1} = action.payload;

    // console.log('%c [mr] duration', 'background-color:Gold; color: black', duration);
    batch(() => {
      dispatch(startWaitActionPrivate(action));
      dispatch(turnOnGemLock());
    });
    setTimeout(() => {
      batch(() => {
        dispatch(endAction());
        dispatch(turnOffGemLock());
      });
    }, duration * 1000);
  };

// ------------ selectors

// not needed
// export const getWaitAction = createSelector([(state: IRootState) => state.waitAction.action], action => action);
