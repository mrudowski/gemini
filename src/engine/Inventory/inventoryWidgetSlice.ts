import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../redux/store';
import {endUseWithAction, getIsCombineMode, getIsUseWithActionActive} from './useWithActionSlice';

interface IInventoryWidgetState {
  visible: boolean;
  ready: boolean;
}

const initialState: IInventoryWidgetState = {
  visible: false,
  ready: false,
};

const inventoryWidgetSlice = createSlice({
  name: 'inventoryWidget',
  initialState,
  reducers: {
    showInventory: (state: IInventoryWidgetState) => {
      state.visible = true;
      state.ready = false;
    },
    hideInventoryPrivate: (state: IInventoryWidgetState) => {
      state.visible = false;
      state.ready = false;
    },
    setInventoryAsReady: (state: IInventoryWidgetState, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
  },
});

export default inventoryWidgetSlice.reducer;

// ------------ actions

export const showInventory = inventoryWidgetSlice.actions.showInventory;
const hideInventoryPrivate = inventoryWidgetSlice.actions.hideInventoryPrivate;
export const setInventoryAsReady = inventoryWidgetSlice.actions.setInventoryAsReady;

// ------------ thunks

export const toggleInventory = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isInventoryVisible = getIsInventoryVisible(state);
  if (isInventoryVisible) {
    dispatch(hideInventory());
  } else {
    dispatch(showInventory());
  }
};

export const hideInventory = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isUseWithActionActive = getIsUseWithActionActive(state);
  const isCombineMode = getIsCombineMode(state);
  if (isUseWithActionActive && isCombineMode) {
    dispatch(endUseWithAction());
  } else {
    batch(() => {
      if (isUseWithActionActive) {
        dispatch(endUseWithAction());
      }
      dispatch(hideInventoryPrivate());
    });
  }
};

// ------------ selectors

export const getIsInventoryVisible = (state: IRootState) => state.inventoryWidget.visible;
export const getIsInventoryReady = (state: IRootState) => state.inventoryWidget.ready;
