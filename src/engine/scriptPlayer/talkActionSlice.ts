import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IAction} from '../actions';
import {IRootState} from '../redux/store';

interface ITalkActionState {
  action: IAction | null,
}

const initialState: ITalkActionState = {
  action: null,
};

const talkActionSlice = createSlice({
  name: 'talkAction',
  initialState,
  reducers: {
    setTalkAction: (state: ITalkActionState, action: PayloadAction<{action: IAction}>) => {
      const {
        action: actionToSet
      } = action.payload;
      state.action = actionToSet;
    },
    endTalkAction: (state: ITalkActionState) => {
      state.action = null;
    },
  }
});

export default talkActionSlice.reducer;

export const setTalkAction = talkActionSlice.actions.setTalkAction;
export const endTalkAction = talkActionSlice.actions.endTalkAction;

// ------------ selectors

export const getTalkAction = createSelector(
  [(state: IRootState) => state.talkAction.action],
  action => action
);
