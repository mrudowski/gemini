import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';

interface IGemState {
  currentLang: string,
  currentSceneId: string,
}

const initialState: IGemState = {
  currentLang: 'en',
  currentSceneId: 'teaShop', // TODO from journey ini!
};

const gemSlice = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    setCurrentLang: (state: IGemState, action: PayloadAction<string>) => {
      state.currentLang = action.payload;
    },
  }
});

export default gemSlice.reducer;

export const getCurrentLang = (state: IRootState) => state.gem.currentLang;
export const getCurrentSceneId = (state: IRootState) => state.gem.currentSceneId;

