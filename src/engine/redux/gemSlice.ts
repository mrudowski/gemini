import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';
import SETTINGS from '../../game/settings';
import {ISceneId} from '../../game/scenes';

interface IGemState {
  currentLang: string;
  currentSceneId: ISceneId;
}

const initialState: IGemState = {
  // TODO when not one slice - world?
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
    setCurrentScene: (state: IGemState, action: PayloadAction<ISceneId>) => {
      state.currentSceneId = action.payload;
    },
  },
});

export default gemSlice.reducer;

export const setCurrentLang = gemSlice.actions.setCurrentLang;
export const setCurrentScene = gemSlice.actions.setCurrentScene;

export const getCurrentLang = (state: IRootState) => state.gem.currentLang;
export const getCurrentSceneId = (state: IRootState) => state.gem.currentSceneId;
