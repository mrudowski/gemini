import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../redux/store';
import SETTINGS from '../../game/settings';
import {ILangId} from '../translation/types';
import {getCurrentDate} from '../commons/utils/utils';
import {persistorPause, persistorPersist} from '../redux/persistorUtils';

export interface IGemState {
  currentLang: ILangId | undefined;
  isSoundOn: boolean;
  save: {
    title: string;
    date: string;
  };
}

const initialState: IGemState = {
  currentLang: SETTINGS.PRIMARY_LANG, // TODO should be set
  isSoundOn: SETTINGS.SOUND,
  save: {
    title: '',
    date: '',
  },
  //isGameStarted: SETTINGS.START_FROM_LAST_SCENE,
};

const gemSlice = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    setCurrentLang: (state: IGemState, action: PayloadAction<ILangId>) => {
      state.currentLang = action.payload;
    },
    setSound: (state: IGemState, action: PayloadAction<boolean>) => {
      state.isSoundOn = action.payload;
    },
    setSaveDate: (state: IGemState) => {
      const date = getCurrentDate();
      // console.log('%c 💾 [persistor] timestamp', 'background-color:black; color: PowderBlue', date);
      state.save.date = date;
    },
  },
});

export default gemSlice.reducer;

// action
// ------------------------------------------

export const saveCurrentGame = (): IThunk => dispatch => {
  persistorPersist();
  dispatch(gemSlice.actions.setSaveDate());
  persistorPause();
};

// thunks
// ------------------------------------------

export const setCurrentLang =
  (langId: ILangId): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(gemSlice.actions.setCurrentLang(langId));
      dispatch(saveCurrentGame());
    });
  };
export const setSound =
  (isSoundOn: boolean): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(gemSlice.actions.setSound(isSoundOn));
      dispatch(saveCurrentGame());
    });
  };

// selectors
// ------------------------------------------

export const getCurrentLang = (state: IRootState) => state.gem.currentLang;
export const getIsSoundOn = (state: IRootState) => state.gem.isSoundOn;
export const getAutosaveDate = (state: IRootState) => state.gem.save.date;
