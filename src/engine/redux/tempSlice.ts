import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from './store';
import {IVerb, showVerbMenu} from '../VerbMenu/verbMenuSlice';

interface ITempState {
  currentPoiId: string | null
}

const initialState: ITempState = {
  currentPoiId: null
};

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setCurrentPoiId: (state: ITempState, action: PayloadAction<string>) => {
      state.currentPoiId = action.payload;
    },
  }
});

export default tempSlice.reducer;

export const setCurrentPoiId = tempSlice.actions.setCurrentPoiId;

// could be done as event with many slices listening
export const poiClicked = ({x, y, poiId, verbs}: {x: number, y: number, poiId: string, verbs: IVerb[]}): IThunk => (dispatch) => {
  batch(() => {
    dispatch(setCurrentPoiId(poiId));
    dispatch(showVerbMenu({x, y, verbs}));
  });
};

export const getCurrentPoiId = (state: IRootState) => state.temp.currentPoiId;

