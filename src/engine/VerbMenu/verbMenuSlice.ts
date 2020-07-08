import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IActionObject} from '../actions';
import {IRootState} from '../redux/store';

export interface IVerb {
  id: string,
  when?: boolean,
  script?: IActionObject[]
}

// verb is a set of:
// atomicAction! or just action

interface IVerbMenuData {
  x: number,
  y: number,
  verbs: IVerb[]
}

interface IVerbMenuState {
  verbMenuData: IVerbMenuData | null
}

const initialState: IVerbMenuState = {
  verbMenuData: null
};

const verbMenuSlice = createSlice({
  name: 'verbMenu',
  initialState,
  reducers: {
    showVerbMenu: (state: IVerbMenuState, action: PayloadAction<{x: number, y: number, verbs: IVerb[]}>) => {
      state.verbMenuData = {
        ...action.payload
      }
    },
    closeVerbMenu: (state: IVerbMenuState) => {
      state.verbMenuData = null;
    },
  }
});

export default verbMenuSlice.reducer;

export const showVerbMenu = verbMenuSlice.actions.showVerbMenu;
export const closeVerbMenu = verbMenuSlice.actions.closeVerbMenu;

export const getVerbMenuData = createSelector(
  [(state: IRootState) => state.verbMenu.verbMenuData],
  verbMenuData => verbMenuData
);
