import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from '../../redux/store';
import {ISpecifiedAction} from '../types';
import {ITalkActionPayload, ITalkOptionsActionPayload} from './talk';

export type ITalkAction = ISpecifiedAction<ITalkActionPayload>;
export type ITalkOptionsAction = ISpecifiedAction<ITalkOptionsActionPayload>;

interface ITalkActionState {
  action: ITalkAction | ITalkOptionsAction | null;
}

const initialState: ITalkActionState = {
  action: null,
};

const talkActionSlice = createSlice({
  name: 'talkAction',
  initialState,
  reducers: {
    startTalkAction: (state: ITalkActionState, action: PayloadAction<ITalkAction | ITalkOptionsAction>) => {
      state.action = action.payload;
    },
    endTalkAction: (state: ITalkActionState) => {
      // console.log('%c [mr] endTalkAction', 'background-color:Gold; color: black');
      state.action = null;
    },
  },
});

export default talkActionSlice.reducer;

export const startTalkAction = talkActionSlice.actions.startTalkAction;
export const endTalkAction = talkActionSlice.actions.endTalkAction;

// ------------ selectors

export const getTalkAction = createSelector([(state: IRootState) => state.talkAction.action], action => action);
export const getIsTalkAction = createSelector([getTalkAction], talkAction => !!talkAction);
