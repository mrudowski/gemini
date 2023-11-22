import {IActionPayload, ISpecifiedAction} from '../types';
import {IWorldState} from '../../../game/worldState';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export interface ISetGlobalStateActionPayload extends IActionPayload {
  state: Partial<IWorldState['global']>;
}

export type ISetGlobalStateAction = (
  payload: ISetGlobalStateActionPayload
) => ISpecifiedAction<ISetGlobalStateActionPayload>;
export const setGlobalState: ISetGlobalStateAction = payload =>
  getSpecificAction(ACTIONS_NAMES.SET_GLOBAL_STATE, payload);
