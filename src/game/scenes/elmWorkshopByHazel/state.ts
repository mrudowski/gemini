import ISceneState from '../../../engine/redux/SceneState';

export interface IElmWorkshopByHazelSceneState extends ISceneState {
  hazelOnDesk: boolean;
}

export const elmWorkshopByHazelSceneInitialState: IElmWorkshopByHazelSceneState = {
  visited: false,
  hazelOnDesk: false,
};
