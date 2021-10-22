import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from './store';
import {IVerb, showVerbMenu} from '../VerbMenu/verbMenuSlice';
import {ISceneId} from '../../game/scenes';

interface ITempState {
  currentPoiId: string | null; // TODO stronger type? pois is in every scene...
  nextSceneId: ISceneId | null;
}

const initialState: ITempState = {
  currentPoiId: null,
  nextSceneId: null,
};

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setCurrentPoiId: (state: ITempState, action: PayloadAction<string>) => {
      state.currentPoiId = action.payload;
    },
    setNextSceneId: (state: ITempState, action: PayloadAction<ISceneId | null>) => {
      console.log('%c [mr] setNextSceneId', 'background-color:Gold; color: black', action.payload);
      state.nextSceneId = action.payload;
    },
  },
});

export default tempSlice.reducer;

export const setCurrentPoiId = tempSlice.actions.setCurrentPoiId;
export const setNextSceneId = tempSlice.actions.setNextSceneId;

// could be done as event with many slices listening
export const poiClicked =
  ({x, y, poiId, verbs}: {x: number; y: number; poiId: string; verbs: IVerb[]}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(setCurrentPoiId(poiId));
      dispatch(showVerbMenu({x, y, verbs}));
    });
  };

export const getCurrentPoiId = (state: IRootState) => state.temp.currentPoiId;
export const getNextSceneId = (state: IRootState) => state.temp.nextSceneId;
