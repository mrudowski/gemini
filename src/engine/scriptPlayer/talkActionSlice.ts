import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    startTalkAction: (state: ITalkActionState, action: PayloadAction<{action: IAction}>) => {
      const {
        action: actionToSet
      } = action.payload;
      state.action = actionToSet;
    },
    endTalkAction: (state: ITalkActionState) => {
      console.log('%c [mr] endTalkAction', 'background-color:Gold; color: black');
      state.action = null;
    },
  }
});

export default talkActionSlice.reducer;

export const startTalkAction = talkActionSlice.actions.startTalkAction;
export const endTalkAction = talkActionSlice.actions.endTalkAction;

// ------------ selectors

export const getTalkAction = createSelector(
  [(state: IRootState) => state.talkAction.action],
  action => action
);
