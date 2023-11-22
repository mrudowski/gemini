import {IAction, IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IInventoryItemId} from '../../Inventory/inventorySlice';

export interface IUseWithActionPayload extends IActionPayload {
  items: Partial<Record<IInventoryItemId, IAction[]>>;
}

export interface IEndUseWithActionPayload extends IActionPayload {}

/**
 * use poi or item with item from the inventory
 *
 * useWith is the only one (?) not chainable action (is a terminate action)
 * we can put action before it
 * but never after
 */
export const useWith = (payload?: IUseWithActionPayload): ISpecifiedAction<IUseWithActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.USE_WITH, payload);
/**
 * use poi or item with item from the inventory
 */
export const endUseWith = (payload?: IEndUseWithActionPayload): ISpecifiedAction<IEndUseWithActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.END_USE_WITH, payload);
