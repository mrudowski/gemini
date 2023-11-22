import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import ACTIONS from '../actions/actions';
import {IRootState, IThunk} from '../redux/store';
import {getIsInventoryVisible, hideInventory, showInventory} from './inventoryWidgetSlice';
import {IInventoryItemId} from './inventorySlice';
import {endAction, playScript} from '../scriptPlayer/scriptPlayerSlice';
import T from '../translation';
import {getRandomInt} from '../commons/utils/utils';
import {ISpecifiedAction} from '../actions/types';
import {getCurrentPoiId, getCurrentSceneId} from '../redux/tempSliceSelectors';
import {IUseWithActionPayload} from '../actions/useWith/useWith';

export type IUseWithAction = ISpecifiedAction<IUseWithActionPayload>;

interface IUseWithActionSlice {
  action: IUseWithAction | null;
  firstPoiIsItem: boolean;
  //secondItemId: IInventoryItemId | null;
}

const initialState: IUseWithActionSlice = {
  action: null,
  firstPoiIsItem: false,
  //secondItemId: null,
};

const useWithActionSlice = createSlice({
  name: 'useWithAction',
  initialState,
  reducers: {
    startUseWithActionPrivate: (
      state: IUseWithActionSlice,
      action: PayloadAction<{actionToSet: IUseWithAction; firstPoiIsItem: boolean}>
    ) => {
      const {actionToSet, firstPoiIsItem} = action.payload;
      state.action = actionToSet;
      state.firstPoiIsItem = firstPoiIsItem;
    },
    // setUseWithSecondItemPrivate: (state: IUseWithActionSlice, action: PayloadAction<IInventoryItemId>) => {
    //   const itemId = action.payload;
    //   state.secondItemId = itemId;
    //   // odpal script odpowiedni
    // },
    endUseWithActionPrivate: (state: IUseWithActionSlice) => {
      state.action = initialState.action;
      state.firstPoiIsItem = initialState.firstPoiIsItem;
      // state.secondItemId = initialState.secondItemId;
    },
  },
});

export default useWithActionSlice.reducer;

// ------------ actions

export const startUseWithActionPrivate = useWithActionSlice.actions.startUseWithActionPrivate;
export const endUseWithActionPrivate = useWithActionSlice.actions.endUseWithActionPrivate;
// export const setUseWithSecondItemPrivate = useWithActionSlice.actions.setUseWithSecondItemPrivate;

// ------------ thunks

export const startUseWithAction =
  (action: IUseWithAction): IThunk =>
  (dispatch, getState) => {
    const state = getState();
    const firstPoiIsItem = getIsInventoryVisible(state);
    batch(() => {
      if (!firstPoiIsItem) {
        dispatch(showInventory());
      }
      dispatch(startUseWithActionPrivate({actionToSet: action, firstPoiIsItem}));
      // only here we do such thing...
      // we assume we don't back to the script with useWith action (and that probably true)
      dispatch(endAction());
    });
  };

export const endUseWithAction = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const isCombineMode = getIsCombineMode(state);
  // we have to dispatch it before hideInventory to avoid LOOP!
  dispatch(endUseWithActionPrivate());
  batch(() => {
    if (!isCombineMode) {
      dispatch(hideInventory());
    }
    dispatch(endAction());
  });
};

export const setUseWithSecondItem =
  (itemId: IInventoryItemId): IThunk =>
  (dispatch, getState) => {
    const state = getState();
    const useWithAction = getUseWithAction(state);
    const sceneId = getCurrentSceneId(state);
    const poiId = getCurrentPoiId(state);
    if (!poiId) {
      throw new Error('`poiId` should be set here but is: ' + poiId);
    }
    if (!useWithAction) {
      return;
    }
    if (poiId === itemId) {
      dispatch(endUseWithAction());
      return;
    }
    const items = useWithAction.payload.items;
    const script = items[itemId];
    if (script) {
      dispatch(playScript({script, sceneId, poiId}));
      return;
    }
    const randomTextArray = T().inventory.randomText;
    const randomTextIndex = getRandomInt(0, randomTextArray.length);
    const randomTextAction = ACTIONS.talk({text: randomTextArray[randomTextIndex]});
    dispatch(playScript({script: [randomTextAction], sceneId, poiId}));
  };

// ------------ selectors

export const getUseWithAction = createSelector([(state: IRootState) => state.useWithAction.action], action => action);
export const getIsUseWithActionActive = createSelector([getUseWithAction], action => !!action);
export const getIsCombineMode = (state: IRootState) => state.useWithAction.firstPoiIsItem;
