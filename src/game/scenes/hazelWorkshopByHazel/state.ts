import ISceneState from '../../../engine/redux/SceneState';

export interface IHazelWorkshopByHazelSceneState extends ISceneState {
  HazelDeskFront: boolean;
}

export const hazelWorkshopByHazelSceneInitialState: IHazelWorkshopByHazelSceneState = {
  visited: false,
  HazelDeskFront: false,
};
