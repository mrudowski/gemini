import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAction} from '../actions';
import {IRootState} from '../redux/store';

interface IWaitActionState {
  action: IAction | null,
}

const initialState: IWaitActionState = {
  action: null,
};

const waitActionSlice = createSlice({
  name: 'waitAction',
  initialState,
  reducers: {
    startWaitAction: (state: IWaitActionState, action: PayloadAction<{action: IAction}>) => {
      const {
        action: actionToSet
      } = action.payload;
      state.action = actionToSet;
    },
    endWaitAction: (state: IWaitActionState) => {
      console.log('%c [mr] endWaitAction', 'background-color:Gold; color: black');
      state.action = null;
    },
  }
});

export default waitActionSlice.reducer;

export const startWaitAction = waitActionSlice.actions.startWaitAction;
export const endWaitAction = waitActionSlice.actions.endWaitAction;

// ------------ selectors

export const getWaitAction = createSelector(
  [(state: IRootState) => state.waitAction.action],
  action => action
);
