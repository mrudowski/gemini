import {IActionPayload, ISpecifiedAction} from '../types';
import {IInventoryItemId} from '../../Inventory/inventorySlice';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export interface IAddItemsActionPayload extends IActionPayload {
  items: IInventoryItemId[];
}

export interface IRemoveItemsActionPayload extends IActionPayload {
  items: IInventoryItemId[];
}

export interface IReplaceItemsActionPayload extends IActionPayload {
  itemToAdd: IInventoryItemId;
  itemToRemove: IInventoryItemId;
}

/**
 * add many items in the inventory
 *
 * If you add an item that is already in inventory the game engine will just skip it
 */
export const addItems = (payload?: IAddItemsActionPayload): ISpecifiedAction<IAddItemsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.ADD_ITEMS, payload);
/**
 * remove many items in the inventory
 */
export const removeItems = (payload?: IRemoveItemsActionPayload): ISpecifiedAction<IRemoveItemsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.REMOVE_ITEMS, payload);
/**
 * replace one single item by another inside the inventory
 */
export const replaceItems = (payload?: IReplaceItemsActionPayload): ISpecifiedAction<IAddItemsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.REPLACE_ITEMS, payload);
