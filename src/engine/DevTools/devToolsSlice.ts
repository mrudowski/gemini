import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from '../redux/store';

interface IDevToolsState {
  debugMode: boolean,
  showPoi: boolean,
  showHiddenPoi: boolean,
  showHotspot: boolean
}

const initialState: IDevToolsState = {
  debugMode: false,
  showPoi: false,
  showHiddenPoi: false,
  showHotspot: false
};

const devToolsSlice = createSlice({
  name: 'devTools',
  initialState,
  reducers: {
    setDebugMode: (state: IDevToolsState, action: PayloadAction<boolean>) => {
      state.debugMode = action.payload;
    },
    togglePoi: (state: IDevToolsState) => {
      state.showPoi = !state.showPoi;
    },
    toggleHiddenPoi: (state: IDevToolsState) => {
      state.showHiddenPoi = !state.showHiddenPoi;
    },
    toggleHotspot: (state: IDevToolsState) => {
      state.showHotspot = !state.showHotspot;
    },
  }
});

export default devToolsSlice.reducer;

// actions
// -------------------------

export const setDebugMode = devToolsSlice.actions.setDebugMode;
export const togglePoi = devToolsSlice.actions.togglePoi;
export const toggleHiddenPoi = devToolsSlice.actions.toggleHiddenPoi;
export const toggleHotspot = devToolsSlice.actions.toggleHotspot;

// selectors
// -------------------------

export const getIsDebugMode = (state: IRootState) => state.devTools.debugMode;
export const getIsShowPoiActive = (state: IRootState) => state.devTools.showPoi;
export const getIsShowHiddenPoiActive = (state: IRootState) => state.devTools.showHiddenPoi;
export const getIsShowHotspotActive = (state: IRootState) => state.devTools.showHotspot;

