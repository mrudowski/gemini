import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAction} from '../actions';
import {IRootState, IThunk} from '../redux/store';
import {playScript} from '../scriptPlayer/scriptPlayerSlice';
import getDefaultScriptForVerb from './getDefaultScriptsForVerbs';
import {getCurrentSceneId} from '../redux/gemSlice';
import {getCurrentPoiId} from '../redux/tempSlice';

export interface IVerb {
  id: string,
  when?: boolean,
  script?: IAction[] //script is just a set of actions
}

interface IVerbMenuData {
  x: number,
  y: number,
  verbs: IVerb[]
}

interface IVerbMenuState {
  verbMenuData: IVerbMenuData | null
}

const initialState: IVerbMenuState = {
  verbMenuData: null
};

const verbMenuSlice = createSlice({
  name: 'verbMenu',
  initialState,
  reducers: {
    showVerbMenu: (state: IVerbMenuState, action: PayloadAction<{x: number, y: number, verbs: IVerb[]}>) => {
      state.verbMenuData = {
        ...action.payload
      };
    },
    closeVerbMenu: (state: IVerbMenuState) => {
      state.verbMenuData = null;
    },
  }
});

export default verbMenuSlice.reducer;

export const showVerbMenu = verbMenuSlice.actions.showVerbMenu;
export const closeVerbMenu = verbMenuSlice.actions.closeVerbMenu;

export const interpretVerb = (verb: IVerb): IThunk => (dispatch, getState) => {
  const state = getState();
  const sceneId = getCurrentSceneId(state);
  const poiId = getCurrentPoiId(state);

  if (!poiId) {
    throw Error('`poiId` should be set here but is: ' + poiId);
  }

  let script = verb.script;
  if (!script) {
    script = getDefaultScriptForVerb(verb.id, sceneId, poiId);
  }
  dispatch(playScript({script, sceneId, poiId}));
};

export const getVerbMenuData = createSelector(
  [(state: IRootState) => state.verbMenu.verbMenuData],
  verbMenuData => verbMenuData
);

