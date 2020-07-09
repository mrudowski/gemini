import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRootState} from './store';

interface IGemState {
  currentLang: string
}

const initialState: IGemState = {
  currentLang: 'en'
};

const gemSlice = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    setCurrentLang: (state: IGemState, action: PayloadAction<string>) => {
      state.currentLang = action.payload
    }
  }
});

export const getCurrentLang = (state: IRootState) => state.gem.currentLang;

export default gemSlice;
