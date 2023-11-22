import ISceneState from '../../../engine/redux/SceneState';

export interface IIntroductionSceneState extends ISceneState {}

export const introductionSceneInitialState: IIntroductionSceneState = {
  visited: false,
};
