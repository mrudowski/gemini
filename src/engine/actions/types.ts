import {IActionName} from './actionsNames';

// import {IDynamicConditionId} from '../../game/dynamicConditions';

export interface IActionPayload {
  id?: string;
  when?: boolean;
  // dynamicWhen?: IDynamicConditionId;
  next?: string;
}

export interface IAction {
  actionName: IActionName;
  id?: string;
  when: boolean;
  // dynamicWhen?: IDynamicConditionId;
  // TODO ? divide it on payload and options (id, when)
  payload: any; // TODO for now only
}

export interface ISpecifiedAction<T> extends IAction {
  payload: Omit<T, 'when'>;
  // payload: Omit<T, 'when' | 'dynamicWhen'>;
}

/**
 * duration in seconds
 */
export type IDuration = number;
