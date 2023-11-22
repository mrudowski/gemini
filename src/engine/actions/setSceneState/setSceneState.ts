import {ISceneId} from '../../scene/Scene/types';
import {IWorldState} from '../../../game/worldState';
import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {ICloseupId} from '../../closeup/Closeup/types';

export interface ISetSceneStateActionPayload<T extends ISceneId | ICloseupId, U extends IWorldState['scenes'][T]>
  extends IActionPayload {
  scene: T;
  state: {
    [key in keyof U]?: U[key];
  };
}

// Partial<IWorldState['scenes']> ?
export type ISetSceneStateAction = <T extends ISceneId | ICloseupId, U extends IWorldState['scenes'][T]>(
  payload: ISetSceneStateActionPayload<T, U>
) => ISpecifiedAction<ISetSceneStateActionPayload<T, U>>;

export const setSceneState: ISetSceneStateAction = payload => getSpecificAction(ACTIONS_NAMES.SET_SCENE_STATE, payload);
