import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export interface IHudActionsActionPayload extends IActionPayload {}

// Partial<IWorldState['scenes']> ?
export type IHudActionsAction = (payload?: IHudActionsActionPayload) => ISpecifiedAction<IHudActionsActionPayload>;

export const showHud: IHudActionsAction = payload => getSpecificAction(ACTIONS_NAMES.SHOW_HUD, payload);
export const hideHud: IHudActionsAction = payload => getSpecificAction(ACTIONS_NAMES.HIDE_HUD, payload);
