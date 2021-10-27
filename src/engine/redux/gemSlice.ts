import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';
import SETTINGS from '../../game/settings';
import {ISceneId} from '../../game/scenes';
import {ILangId} from '../../game/languages';

interface IGemState {
  currentLang: ILangId | undefined;
  langToLoad: ILangId;
  currentSceneId: ISceneId;
}

const initialState: IGemState = {
  // TODO when not one slice - world?
  currentLang: undefined,
  langToLoad: SETTINGS.PRIMARY_LANG,
  currentSceneId: SETTINGS.FIRST_SCENE,
};

const gemSlice = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    setCurrentLang: (state: IGemState, action: PayloadAction<ILangId>) => {
      state.currentLang = action.payload;
    },
    setLangToLoad: (state: IGemState, action: PayloadAction<ILangId>) => {
      state.langToLoad = action.payload;
      //state.currentLang = undefined;
    },
    setCurrentScene: (state: IGemState, action: PayloadAction<ISceneId>) => {
      state.currentSceneId = action.payload;
    },
  },
});

export default gemSlice.reducer;

export const setCurrentLang = gemSlice.actions.setCurrentLang;
export const setLangToLoad = gemSlice.actions.setLangToLoad;
export const setCurrentScene = gemSlice.actions.setCurrentScene;

export const getCurrentLang = (state: IRootState) => state.gem.currentLang;
export const getLangToLoad = (state: IRootState) => state.gem.langToLoad;
export const getCurrentSceneId = (state: IRootState) => state.gem.currentSceneId;
