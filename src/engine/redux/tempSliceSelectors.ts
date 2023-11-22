import {createSelector} from '@reduxjs/toolkit';
import {IRootState} from './store';
import {ISceneId} from '../scene/Scene/types';
import {getCurrentLang} from '../Gem/gemSlice';
import SETTINGS from '../../game/settings';

export const getCurrentPoiId = (state: IRootState) => state.temp.currentPoiId;
export const getCurrentSceneId = (state: IRootState) => state.temp.currentSceneId;
export const getNextSceneId = (state: IRootState) => state.temp.nextSceneId;
export const getPreviousSceneIdForNextScene = (state: IRootState) => state.temp.previousSceneIdForNextScene;
const getPausedSceneId = (state: IRootState) => state.temp.pausedSceneId;
export const getShowPois = (state: IRootState) => state.temp.showPois;
export const getIsGemLockOn = (state: IRootState) => state.temp.gemLock > 0;
export const getIsGemLoading = (state: IRootState) => state.temp.gemLoading > 0;
export const getIsGemReady = (state: IRootState) => state.temp.gemReady;
export const getForceSceneUpdater = (state: IRootState) => state.temp.forceSceneUpdater;

export const getLangToLoad = createSelector(
  [getCurrentLang, (state: IRootState) => state.temp.langToLoad],
  (currentLang, langToLoad) => {
    return langToLoad || currentLang || SETTINGS.PRIMARY_LANG;
  }
);

export const getIsLangLoaded = (state: IRootState) => state.temp.langLoaded;

export const getIsSceneReady = createSelector(
  [getIsGemReady, getCurrentSceneId, (state: IRootState, sceneId: ISceneId) => sceneId],
  (gemReady, currentSceneId, sceneId) => {
    return gemReady && currentSceneId === sceneId;
  }
);

const getIsScenePaused = createSelector(
  [getPausedSceneId, (state: IRootState, sceneId: ISceneId) => sceneId],
  (pausedSceneId, sceneId) => {
    return pausedSceneId === sceneId;
  }
);

export const getIsSceneReadyAndActive = createSelector(
  [
    (state: IRootState, sceneId: ISceneId) => getIsSceneReady(state, sceneId),
    (state: IRootState, sceneId: ISceneId) => getIsScenePaused(state, sceneId),
  ],
  (sceneReady, scenePaused) => {
    return sceneReady && !scenePaused;
  }
);
