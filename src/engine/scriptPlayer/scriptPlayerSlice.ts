import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAction} from '../actions';

interface IScriptPlayerState {
  script: IAction[] | null
}

const initialState: IScriptPlayerState = {
  script: null
};

const scriptPlayerSlice = createSlice({
  name: 'scriptPlayer',
  initialState,
  reducers: {
    playScript: (state: IScriptPlayerState, action: PayloadAction<{script: IAction[], sceneId: string, poiId: string}>) => {
      const {
        script
      } = action.payload;
      console.log('%c [playScript]', 'background-color:Gold; color: black', script);
      // state.script = {
      //   ...script
      // };
    }
  }
});

export default scriptPlayerSlice.reducer;

export const playScript = scriptPlayerSlice.actions.playScript;

// export const getVerbMenuData = createSelector(
//   [(state: IRootState) => state.verbMenu.verbMenuData],
//   verbMenuData => verbMenuData
// );
