import {IActionPayload, ISpecifiedAction} from '../types';
import {ISceneId} from '../../scene/Scene/types';
import {IThunk} from '../../redux/store';

export interface IGotoSceneActionPayload extends IActionPayload {
  scene: ISceneId;
  pause?: boolean;
}

export type IGotoSceneAction = (payload: IGotoSceneActionPayload) => ISpecifiedAction<IGotoSceneActionPayload>;
export type IStartGotoSceneAction = (args: ReturnType<IGotoSceneAction>) => IThunk;
