import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';
import SETTINGS from '../../sampleGame01/settings';

interface IGemState {
  currentLang: string,
  currentSceneId: string,
}

const initialState: IGemState = {
  currentLang: SETTINGS.PRIMARY_LANG,
  currentSceneId: SETTINGS.FIRST_SCENE,
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

