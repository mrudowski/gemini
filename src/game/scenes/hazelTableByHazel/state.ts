import ISceneState from '../../../engine/redux/SceneState';

export interface IHazelTableByHazelSceneState extends ISceneState {}

export const hazelTableByHazelSceneInitialState: IHazelTableByHazelSceneState = {
  visited: false,
};
