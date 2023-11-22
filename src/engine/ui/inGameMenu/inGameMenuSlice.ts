import {createSlice} from '@reduxjs/toolkit';
import {IRootState, IThunk} from '../../redux/store';

interface IInGameMenuState {
  visible: boolean;
  saveGameModalVisible: boolean;
  exportGameModalVisible: boolean;
}

const initialState: IInGameMenuState = {
  visible: false,
  saveGameModalVisible: false,
  exportGameModalVisible: false,
};

const inGameMenuSlice = createSlice({
  name: 'inGameMenu',
  initialState,
  reducers: {
    showInGameMenu: (state: IInGameMenuState) => {
      state.visible = true;
    },
    hideInGameMenu: (state: IInGameMenuState) => {
      state.visible = false;
    },
    showSaveGameModal: (state: IInGameMenuState) => {
      state.saveGameModalVisible = true;
    },
    hideSaveGameModal: (state: IInGameMenuState) => {
      state.saveGameModalVisible = false;
    },
    showExportGameModal: (state: IInGameMenuState) => {
      state.exportGameModalVisible = true;
    },
    hideExportGameModal: (state: IInGameMenuState) => {
      state.exportGameModalVisible = false;
    },
  },
});

export default inGameMenuSlice.reducer;

// ------------ actions

const _showInGameMenu = inGameMenuSlice.actions.showInGameMenu;
const _hideInGameMenu = inGameMenuSlice.actions.hideInGameMenu;
export const showSaveGameModal = inGameMenuSlice.actions.showSaveGameModal;
export const hideSaveGameModal = inGameMenuSlice.actions.hideSaveGameModal;
export const showExportGameModal = inGameMenuSlice.actions.showExportGameModal;
export const hideExportGameModal = inGameMenuSlice.actions.hideExportGameModal;

// ------------ thunks

export const toggleInGameMenu = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isInGameMenuVisible = getIsInGameMenuVisible(state);
  if (isInGameMenuVisible) {
    dispatch(_hideInGameMenu());
  } else {
    dispatch(_showInGameMenu());
  }
};

// ------------ selectors

export const getIsInGameMenuVisible = (state: IRootState) => state.inGameMenu.visible;
export const getIsSaveGameModalVisible = (state: IRootState) => state.inGameMenu.saveGameModalVisible;
export const getIsExportGameModalVisible = (state: IRootState) => state.inGameMenu.exportGameModalVisible;
