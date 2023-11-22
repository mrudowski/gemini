import {IActionPayload, IDuration, ISpecifiedAction} from '../types';

export interface IWaitActionPayload extends IActionPayload {
  /**
   * duration in seconds
   */
  duration?: IDuration;
}

// TODO the same name as IWaitActionReturnType in slice
export type IWaitAction = (payload?: IWaitActionPayload) => ISpecifiedAction<IWaitActionPayload>;
