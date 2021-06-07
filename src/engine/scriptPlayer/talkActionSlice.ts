import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISpecifiedAction, ITalkActionPayload, ITalkOptionsActionPayload} from '../actions';
import {IRootState} from '../redux/store';

export type ITalkAction = ISpecifiedAction<ITalkActionPayload>;
export type ITalkOptionsAction = ISpecifiedAction<ITalkOptionsActionPayload>;

interface ITalkActionState {
  action: ITalkAction | ITalkOptionsAction | null,
}

const initialState: ITalkActionState = {
  action: null,
};

const talkActionSlice = createSlice({
  name: 'talkAction',
  initialState,
  reducers: {
    startTalkAction: (state: ITalkActionState, action: PayloadAction<{action: ITalkAction | ITalkOptionsAction}>) => {
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
