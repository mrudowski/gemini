import ISceneState from '../../../engine/redux/SceneState';

export interface IElmWorkshopByHazelSceneState extends ISceneState {
  afterFirstTalk: boolean
}

export const elmWorkshopByHazelSceneInitialState: IElmWorkshopByHazelSceneState = {
  visited: false,
  afterFirstTalk: false
};
