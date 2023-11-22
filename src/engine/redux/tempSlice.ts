import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IThunk} from './store';
import {IVerb, showVerbMenu} from '../VerbMenu/verbMenuSlice';
import {ISceneId} from '../scene/Scene/types';
import {getIsUseWithActionActive, setUseWithSecondItem} from '../Inventory/useWithActionSlice';
import {IInventoryItemId} from '../Inventory/inventorySlice';
import SETTINGS from '../../game/settings';
import {getLastSavedSceneId, saveCurrentSceneId} from '../World/worldSlice';
import {getCurrentSceneId} from './tempSliceSelectors';
import {ILangId} from '../translation/types';

const notSavableScenes = [SETTINGS.INTRO_SCENE, SETTINGS.MAIN_SCENE]; // TODO in the future we add CREDITS_SCENE here
export const isSavableScene = (sceneId: ISceneId) => !notSavableScenes.includes(sceneId);

interface ITempState {
  currentPoiId: string | null; // TODO stronger type? pois is in every scene...
  currentSceneId: ISceneId;
  nextSceneId: ISceneId | null;
  previousSceneIdForNextScene: ISceneId | null;
  pausedSceneId: ISceneId | null;
  langToLoad: ILangId | null;
  langLoaded: boolean;
  showPois: boolean;
  gemLock: number;
  gemLoading: number;
  gemLoadingKind: 'main' | 'ui';
  /**
   * needed to fire action on onAnimationComplete
   * fix first time condition temp.currentSceneId === scene.id
   */
  gemReady: boolean;
  /**
   * when loading state snapshot for the same scene we already in
   * a way to refresh it and fire onBeforeEnter, onEnter
   */
  forceSceneUpdater: number;
}

const initialState: ITempState = {
  currentPoiId: null,
  currentSceneId: SETTINGS.INTRO_SCENE,
  nextSceneId: null,
  previousSceneIdForNextScene: null,
  pausedSceneId: null,
  langToLoad: null,
  langLoaded: false,
  showPois: false,
  gemLock: 0,
  gemLoading: 0,
  gemLoadingKind: 'main',
  gemReady: false,
  forceSceneUpdater: 1,
};

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setCurrentPoiId: (state: ITempState, action: PayloadAction<string>) => {
      state.currentPoiId = action.payload;
    },
    setCurrentSceneId: (state: ITempState, action: PayloadAction<ISceneId>) => {
      state.currentSceneId = action.payload;
    },
    setNextSceneId: (state: ITempState, action: PayloadAction<ISceneId | null>) => {
      // console.log('%c [mr] setNextSceneId', 'background-color:Gold; color: black', action.payload);
      state.nextSceneId = action.payload;
    },
    setPreviousSceneIdForNextScene: (state: ITempState, action: PayloadAction<ISceneId | null>) => {
      state.previousSceneIdForNextScene = action.payload;
    },
    pauseScene: (state: ITempState, action: PayloadAction<ISceneId>) => {
      state.pausedSceneId = action.payload;
    },
    resumeScene: (state: ITempState) => {
      state.pausedSceneId = null;
    },
    setLangToLoad: (state: ITempState, action: PayloadAction<ILangId>) => {
      state.langToLoad = action.payload;
    },
    setLangLoaded: (state: ITempState) => {
      state.langLoaded = true;
    },
    showPoisPrivate: (state: ITempState, action: PayloadAction<boolean>) => {
      state.showPois = action.payload;
    },
    turnOnGemLock: (state: ITempState) => {
      state.gemLock = state.gemLock + 1;
      // console.log('%c [mr] testing gemLock up', 'background-color:black; color: pink', state.gemLock);
    },
    turnOffGemLock: (state: ITempState) => {
      // if (state.gemLock <= 0) {
      //   console.log('%c [mr] testing turnOffGemLock: gemLock is already 0', 'background-color:black; color: red');
      // }
      state.gemLock = Math.max(state.gemLock - 1, 0);
      // console.log('%c [mr] testing gemLock down', 'background-color:black; color: pink', state.gemLock);
    },
    turnOnGemLoading: (state: ITempState, action: PayloadAction<'main' | 'ui'>) => {
      state.gemLoading = state.gemLoading + 1;
      state.gemLoadingKind = action.payload;
    },
    turnOffGemLoading: (state: ITempState) => {
      state.gemLoading = Math.max(state.gemLoading - 1, 0);
    },
    setGemReady: (state: ITempState) => {
      state.gemReady = true;
    },
    forceSceneUpdate: (state: ITempState) => {
      state.forceSceneUpdater = state.forceSceneUpdater + 1;
    },
  },
});

export default tempSlice.reducer;

export const setCurrentPoiId = tempSlice.actions.setCurrentPoiId;
// const setCurrentSceneIdInTempSlice = tempSlice.actions.setCurrentSceneId;
const showPoisPrivate = tempSlice.actions.showPoisPrivate;
export const pauseScene = tempSlice.actions.pauseScene;
export const resumeScene = tempSlice.actions.resumeScene;
export const setLangToLoad = tempSlice.actions.setLangToLoad;
export const setLangLoaded = tempSlice.actions.setLangLoaded;
export const turnOnGemLock = tempSlice.actions.turnOnGemLock;
export const turnOffGemLock = tempSlice.actions.turnOffGemLock;
export const turnOnGemLoading = tempSlice.actions.turnOnGemLoading;
export const turnOffGemLoading = tempSlice.actions.turnOffGemLoading;
export const setGemReady = tempSlice.actions.setGemReady;
export const forceSceneUpdate = tempSlice.actions.forceSceneUpdate;
// export const onIntroPlayed = tempSlice.actions.onIntroPlayed;

// thunks

export const setCurrentSceneId =
  (sceneId: ISceneId): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(tempSlice.actions.setCurrentSceneId(sceneId));
      if (isSavableScene(sceneId)) {
        dispatch(saveCurrentSceneId(sceneId));
      }
    });
  };

export const setNextSceneId =
  (sceneId: ISceneId | null): IThunk =>
  (dispatch, getState) => {
    if (sceneId) {
      const state = getState();
      const currentSceneId = getCurrentSceneId(state);
      batch(() => {
        dispatch(tempSlice.actions.setPreviousSceneIdForNextScene(currentSceneId));
        dispatch(tempSlice.actions.setNextSceneId(sceneId));
      });
    } else {
      batch(() => {
        dispatch(tempSlice.actions.setPreviousSceneIdForNextScene(null));
        dispatch(tempSlice.actions.setNextSceneId(null));
      });
    }
  };

export const poiClicked =
  ({x, y, poiId, verbs}: {x: number; y: number; poiId: string; verbs: IVerb[]}): IThunk =>
  (dispatch, getState) => {
    const state = getState();
    const isUseWithActionActive = getIsUseWithActionActive(state);
    if (isUseWithActionActive) {
      dispatch(setUseWithSecondItem(poiId as IInventoryItemId));
    } else {
      batch(() => {
        dispatch(setCurrentPoiId(poiId));
        dispatch(showVerbMenu({x, y, verbs}));
      });
    }
  };

export const showPois = (): IThunk => dispatch => {
  dispatch(showPoisPrivate(true));

  setTimeout(() => {
    // batch(() => {
    dispatch(showPoisPrivate(false));
    // });
  }, 1000);
};

export const developFromLastSceneThunk = (): IThunk => (dispatch, getState) => {
  const lastSavedSceneId: ISceneId = getLastSavedSceneId(getState());
  dispatch(tempSlice.actions.setCurrentSceneId(lastSavedSceneId));
};
