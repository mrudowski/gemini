import {IActionPayload, ISpecifiedAction} from '../types';
import {IActorId} from '../../Dialogue/types';

interface ISwitchActorActionPayload extends IActionPayload {
  actor: IActorId;
}
export type ISwitchActorAction = (payload: ISwitchActorActionPayload) => ISpecifiedAction<ISwitchActorActionPayload>;
