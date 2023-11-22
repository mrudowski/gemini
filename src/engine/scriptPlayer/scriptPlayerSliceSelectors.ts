import {createSelector} from '@reduxjs/toolkit';
import {IRootState} from '../redux/store';
import actionSettersMap from '../actions/actionSettersMap';
import {getNextActionIndex} from './utils';

export const getActionSetter = (actionId: string) => ({
  actionId,
  ...actionSettersMap[actionId],
});

export const getCurrentScript = (state: IRootState) => state.scriptPlayer.script;
export const getCurrentScriptPoiId = (state: IRootState) => state.scriptPlayer.poiId;
export const getCurrentScriptSceneId = (state: IRootState) => state.scriptPlayer.sceneId;
export const getCurrentActionIndex = (state: IRootState) => state.scriptPlayer.actionIndex;
const getCurrentAction = createSelector(
  [getCurrentScript, getCurrentActionIndex],
  (currentScript, currentActionIndex) => {
    return currentScript?.[currentActionIndex] || null;
  }
);

export const getActionByIndex = createSelector(
  [getCurrentScript, (state: IRootState, index: number) => index],
  (currentScript, index) => {
    return currentScript?.[index] || null;
  }
);

export const getNextActiveAction = createSelector(
  [getCurrentScript, getCurrentActionIndex, (state: IRootState) => state],
  (currentScript, currentActionIndex, state) => {
    const currentAction = getCurrentAction(state);
    const next = currentAction?.payload.next || '';

    const nextActionIndex = getNextActionIndex(state.scriptPlayer.script, state.scriptPlayer.actionIndex, next);

    if (nextActionIndex === -1) {
      return null;
    }
    return getActionByIndex(state, nextActionIndex);
  }
);

export const getSkipToActionOnInterrupt = (state: IRootState) => state.scriptPlayer.skipToActionOnInterrupt;
