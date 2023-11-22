import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IActionPayload, ISpecifiedAction} from '../types';

export interface IResumeSceneActionPayload extends IActionPayload {}
export type IResumeSceneAction = (payload?: IResumeSceneActionPayload) => ISpecifiedAction<IResumeSceneActionPayload>;

export const resumeScene: IResumeSceneAction = payload => getSpecificAction(ACTIONS_NAMES.RESUME_SCENE, payload);
