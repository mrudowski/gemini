import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getIsInventoryVisible} from '../Inventory/inventoryWidgetSlice';
import {getIsTalkAction} from '../actions/talk/talkActionSlice';
import {
  getIsExportGameModalVisible,
  getIsInGameMenuVisible,
  getIsSaveGameModalVisible,
} from '../ui/inGameMenu/inGameMenuSlice';
import {IRootState} from '../redux/store';
import {getIsGemLockOn} from '../redux/tempSliceSelectors';
import {getIsShowTextAction} from '../actions/showText/showTextActionSlice';
import {getIsNotebookVisible} from '../notebook/notebookWidgetSlice';
import {getIsHerbariumVisible} from '../herbarium/herbariumWidgetSlice';
import {getVerbMenuData} from '../VerbMenu/verbMenuSelectors';

interface IHudState {
  inGameMenu: boolean;
  inventory: boolean;
  showPois: boolean;
  elmHazelSwitch: boolean;
  notebook: boolean;
  herbarium: boolean;
  // map: boolean;
}

export type IHudId = keyof IHudState;

const initialState: IHudState = {
  inGameMenu: false,
  inventory: false,
  showPois: false,
  elmHazelSwitch: false,
  notebook: false,
  herbarium: false,
};

const hudSlice = createSlice({
  name: 'hud',
  initialState,
  reducers: {
    showHudElement: (state: IHudState, action: PayloadAction<{hudElement: IHudId; visible: boolean}>) => {
      const {hudElement, visible} = action.payload;
      state[hudElement] = visible;
    },
  },
});

export default hudSlice.reducer;

// ------------ actions

export const showHudElement = hudSlice.actions.showHudElement;

// ------------ selectors

export const getIsInGameMenuTriggerVisible = (state: IRootState) => state.hud.inGameMenu;

export const getIsInventoryTriggerVisible = (state: IRootState) =>
  state.hud.inventory && state.inventory.items.length > 0;
export const getIsINotebookTriggerVisible = (state: IRootState) =>
  state.hud.notebook && state.notebook.notes.length > 0;
export const getIsShowPoisTriggerVisible = (state: IRootState) => state.hud.showPois;

export const getIsHerbariumTriggerVisible = (state: IRootState) =>
  state.hud.herbarium && state.world.global.showHerbariumTrigger;
export const getIsElmHazelSwitchTriggerVisible = (state: IRootState) =>
  state.hud.elmHazelSwitch && state.world.global.showElmHazelSwitch;

// ---------------

const getIsHudTriggerActive = createSelector(
  [getIsTalkAction, getIsShowTextAction, getVerbMenuData, getIsGemLockOn],
  (isTalkAction, isShowTextAction, verbMenuData, gemLockOn) => {
    if (gemLockOn || isTalkAction || isShowTextAction || !!verbMenuData) return false;
    return true;
  }
);

const getIsSomeUIAlreadyVisible = createSelector(
  [getIsInGameMenuVisible, getIsInventoryVisible, getIsNotebookVisible, getIsHerbariumVisible],
  (isInGameMenuVisible, isInventoryVisible, isNotebookVisible, isHerbariumVisible) => {
    if (isInGameMenuVisible || isInventoryVisible || isNotebookVisible || isHerbariumVisible) return true;
    return false;
  }
);

// ---------------

export const getIsInGameMenuTriggerActive = createSelector(
  [
    getIsInGameMenuVisible,
    getIsHudTriggerActive,
    getIsSaveGameModalVisible,
    getIsExportGameModalVisible,
    getIsSomeUIAlreadyVisible,
  ],
  (
    isInGameMenuVisible,
    isHudTriggerActive,
    isSaveGameModalVisible,
    isExportGameModalVisible,
    isSomeUIAlreadyVisible
  ) => {
    if (!isHudTriggerActive) return false;
    if (isSaveGameModalVisible || isExportGameModalVisible) return false;
    if (isInGameMenuVisible) return true;
    if (isSomeUIAlreadyVisible) return false;
    return true;
  }
);

export const getIsInventoryTriggerActive = createSelector(
  [getIsInventoryVisible, getIsHudTriggerActive, getIsSomeUIAlreadyVisible],
  (isInventoryVisible, isHudTriggerActive, isSomeUIAlreadyVisible) => {
    if (!isHudTriggerActive) return false;
    if (isInventoryVisible) return true;
    if (isSomeUIAlreadyVisible) return false;
    return true;
  }
);

export const getIsNotebookTriggerActive = createSelector(
  [getIsNotebookVisible, getIsHudTriggerActive, getIsSomeUIAlreadyVisible],
  (isNotebookVisible, isHudTriggerActive, isSomeUIAlreadyVisible) => {
    if (!isHudTriggerActive) return false;
    if (isNotebookVisible) return true;
    if (isSomeUIAlreadyVisible) return false;
    return true;
  }
);

export const getIsHerbariumTriggerActive = createSelector(
  [getIsHerbariumVisible, getIsHudTriggerActive, getIsSomeUIAlreadyVisible],
  (isHerbariumVisible, isHudTriggerActive, isSomeUIAlreadyVisible) => {
    if (!isHudTriggerActive) return false;
    if (isHerbariumVisible) return true;
    if (isSomeUIAlreadyVisible) return false;
    return true;
  }
);
