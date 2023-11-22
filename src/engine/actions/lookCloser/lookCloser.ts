import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IActionPayload, ISpecifiedAction} from '../types';
import {ICloseupId} from '../../closeup/Closeup/types';

export interface ILookCloserActionPayload extends IActionPayload {
  scene: ICloseupId;
}

export type ILookCloserAction = (payload: ILookCloserActionPayload) => ISpecifiedAction<ILookCloserActionPayload>;
export const lookCloser: ILookCloserAction = payload => getSpecificAction(ACTIONS_NAMES.LOOK_CLOSER, payload);

export type ICloseCloseupAction = (payload?: IActionPayload) => ISpecifiedAction<IActionPayload>;
export const closeCloseup: ICloseCloseupAction = payload => getSpecificAction(ACTIONS_NAMES.CLOSE_CLOSEUP, payload);
