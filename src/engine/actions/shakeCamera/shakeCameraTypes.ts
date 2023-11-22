import {IActionPayload, IDuration, ISpecifiedAction} from '../types';

export interface IShakeCameraActionPayload extends IActionPayload {
  duration?: IDuration;
}
export type IShakeCameraAction = (payload?: IShakeCameraActionPayload) => ISpecifiedAction<IShakeCameraActionPayload>;
