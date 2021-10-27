import ISceneState from '../../../engine/redux/SceneState';

export interface IElmWorkshopByHazelSceneState extends ISceneState {
  hazelOnDesk: boolean;
  afterFirstTalk: boolean;
}

export const elmWorkshopByHazelSceneInitialState: IElmWorkshopByHazelSceneState = {
  visited: false,
  hazelOnDesk: false,
  afterFirstTalk: false,
};
