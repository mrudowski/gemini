import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IActionPayload, ISpecifiedAction} from '../types';
import {ICustomActionId} from '../../../game/customActions';
import {IThunk} from '../../redux/store';

export interface ICustomActionPayload extends IActionPayload {
  action: ICustomActionId;
}
export type ICustomAction = (payload?: ICustomActionPayload) => ISpecifiedAction<ICustomActionPayload>;

export const custom: ICustomAction = payload => getSpecificAction(ACTIONS_NAMES.CUSTOM, payload);

export type IStartCustomAction = (args: ReturnType<ICustomAction>) => IThunk;
