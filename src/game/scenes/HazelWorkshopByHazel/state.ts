import ISceneState from '../../../engine/redux/SceneState';

export interface IHazelWorkshopByHazelSceneState extends ISceneState {}

export const hazelWorkshopByHazelSceneInitialState: IHazelWorkshopByHazelSceneState = {
  visited: false,
};
