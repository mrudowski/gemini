import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from '../../redux/store';
import {ISpecifiedAction} from '../types';
import {IShowTextActionPayload} from './showText';

export type IShowTextAction = ISpecifiedAction<IShowTextActionPayload>;

interface IShowTextActionState {
  action: IShowTextAction | null;
}

const initialState: IShowTextActionState = {
  action: null,
};

const showTextActionSlice = createSlice({
  name: 'showTextAction',
  initialState,
  reducers: {
    startShowTextAction: (state: IShowTextActionState, action: PayloadAction<IShowTextAction>) => {
      state.action = action.payload;
    },
    endShowTextAction: (state: IShowTextActionState) => {
      state.action = null;
    },
  },
});

export default showTextActionSlice.reducer;

export const startShowTextAction = showTextActionSlice.actions.startShowTextAction;
export const endShowTextAction = showTextActionSlice.actions.endShowTextAction;

// ------------ selectors

export const getShowTextAction = createSelector([(state: IRootState) => state.showTextAction.action], action => action);
export const getIsShowTextAction = createSelector([getShowTextAction], showTextAction => !!showTextAction);
