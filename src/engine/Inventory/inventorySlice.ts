import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IRootState, IThunk} from '../redux/store';
import INVENTORY_ITEMS, {
  INVENTORY_HERBS,
  INVENTORY_HERBS_FLOWERS,
  INVENTORY_HERBS_LEAFS,
  INVENTORY_HERBS_STALKS,
} from '../../game/inventory/inventoryItems';
import {endAction} from '../scriptPlayer/scriptPlayerSlice';
import {ISpecifiedAction} from '../actions/types';
import {
  IAddItemsActionPayload,
  IRemoveItemsActionPayload,
  IReplaceItemsActionPayload,
} from '../actions/inventoryActions/inventoryActions';
import {inventoryInitialState} from '../../game/inventory/inventoryState';

export type IInventoryItemId = keyof typeof INVENTORY_ITEMS;

export interface IInventoryState {
  items: IInventoryItemId[];
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: inventoryInitialState,
  reducers: {
    addItems: (state: IInventoryState, action: PayloadAction<IInventoryItemId[]>) => {
      const itemsToAdd = action.payload;
      itemsToAdd.forEach(itemToAdd => {
        if (!state.items.includes(itemToAdd)) {
          state.items.push(itemToAdd);
        }
      });
    },
    removeItems: (state: IInventoryState, action: PayloadAction<IInventoryItemId[]>) => {
      const itemsToRemove = action.payload;
      itemsToRemove.forEach(itemToRemove => {
        if (state.items.includes(itemToRemove)) {
          state.items = state.items.filter(item => item !== itemToRemove);
        }
      });
    },
    replaceItems: (
      state: IInventoryState,
      action: PayloadAction<{itemToAdd: IInventoryItemId; itemToRemove: IInventoryItemId}>
    ) => {
      const {itemToAdd, itemToRemove} = action.payload;
      const itemToRemoveIndex = state.items.indexOf(itemToRemove);
      if (itemToRemoveIndex === -1) {
        throw new Error('missing item "' + itemToRemove + '" during replaceItem action');
      }
      if (state.items.includes(itemToAdd)) {
        throw new Error(
          'We cannot add item "' + itemToAdd + '" which is already in inventory during replaceItem action'
        );
      }
      state.items[itemToRemoveIndex] = itemToAdd;
    },
    endItemsAction: () => {
      // do nothing for now
    },
    restoreInventoryState: (state: IInventoryState, action: PayloadAction<IInventoryState>) => {
      return action.payload;
    },
    resetInventoryState: () => {
      return inventoryInitialState;
    },
  },
});

export default inventorySlice.reducer;

// ------------ thunk

export const addItems =
  (itemsIdsToAdd: IInventoryItemId[]): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(inventorySlice.actions.addItems(itemsIdsToAdd));
    });
  };
export const removeItems =
  (itemsIdsToRemove: IInventoryItemId[]): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(inventorySlice.actions.removeItems(itemsIdsToRemove));
    });
  };
export const replaceItems =
  (args: {itemToAdd: IInventoryItemId; itemToRemove: IInventoryItemId}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(inventorySlice.actions.replaceItems(args));
    });
  };
export const endItemsAction = (): IThunk => dispatch => {
  batch(() => {
    dispatch(inventorySlice.actions.endItemsAction());
  });
};
export const restoreInventoryState =
  (inventoryState: IInventoryState): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(inventorySlice.actions.restoreInventoryState(inventoryState));
    });
  };
export const resetInventoryState = (): IThunk => dispatch => {
  batch(() => {
    dispatch(inventorySlice.actions.resetInventoryState());
  });
};

// --------------

type IAddItemsAction = ISpecifiedAction<IAddItemsActionPayload>;
export const startAddItemsAction =
  (action: IAddItemsAction): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(addItems(action.payload.items));
      dispatch(endAction());
    });
  };

type IRemoveItemsAction = ISpecifiedAction<IRemoveItemsActionPayload>;
export const startRemoveItemsAction =
  (action: IRemoveItemsAction): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(removeItems(action.payload.items));
      dispatch(endAction());
    });
  };

type IReplaceItemsAction = ISpecifiedAction<IReplaceItemsActionPayload>;
export const startReplaceItemsAction =
  (action: IReplaceItemsAction): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(replaceItems({itemToRemove: action.payload.itemToRemove, itemToAdd: action.payload.itemToAdd}));
      dispatch(endAction());
    });
  };

// ------------ selectors

export const getInventoryItems = createSelector([(state: IRootState) => state.inventory.items], items => items);
// export const getInventoryItemsAmount = createSelector([getInventoryItems], items => items.length);

export const getInventoryItemsWithoutHerbs = createSelector([getInventoryItems], inventoryItems => {
  const herbsAsArray = Object.values(INVENTORY_HERBS);
  return inventoryItems.filter(item => !herbsAsArray.includes(item as keyof typeof INVENTORY_HERBS));
});

const herbsFlowersAsArray = Object.values(INVENTORY_HERBS_FLOWERS);
const herbsLeafsAsArray = Object.values(INVENTORY_HERBS_LEAFS);
const herbsStalksAsArray = Object.values(INVENTORY_HERBS_STALKS);
export const getItemIndex = createSelector(
  [getInventoryItems, getInventoryItemsWithoutHerbs, (state: IRootState, itemId: IInventoryItemId) => itemId],
  (inventoryItems, itemsWithoutHerbs, itemId) => {
    if (herbsFlowersAsArray.includes(itemId as keyof typeof INVENTORY_HERBS_FLOWERS)) {
      if (inventoryItems.includes(itemId)) {
        return 1000;
      }
    }
    if (herbsLeafsAsArray.includes(itemId as keyof typeof INVENTORY_HERBS_LEAFS)) {
      if (inventoryItems.includes(itemId)) {
        return 1001;
      }
    }
    if (herbsStalksAsArray.includes(itemId as keyof typeof INVENTORY_HERBS_STALKS)) {
      if (inventoryItems.includes(itemId)) {
        return 1002;
      }
    }
    return itemsWithoutHerbs.indexOf(itemId);
  }
);

// export const getIsItemInInventory = (itemId: IInventoryItemId) =>
//   createSelector([getInventoryItems], items => items.includes(itemId));

export const getIsItemInInventoryMap = createSelector([getInventoryItems], items => {
  return Object.fromEntries(Object.keys(INVENTORY_ITEMS).map((itemId: any) => [itemId, items.includes(itemId)]));
});
