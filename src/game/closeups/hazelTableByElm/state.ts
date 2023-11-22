import ISceneState from '../../../engine/redux/SceneState';

export interface IHazelTableByElmSceneState extends ISceneState {
  drawerStartOff: boolean;
  hazelPuzzleSolved: boolean;

  FlowerBox: number;
  LeafBox: number;
  StalkBox: number;
  solvedEquations: number;
}

export const hazelTableByElmSceneInitialState: IHazelTableByElmSceneState = {
  visited: false,
  drawerStartOff: false,
  hazelPuzzleSolved: false,

  FlowerBox: 0,
  LeafBox: 0,
  StalkBox: 0,
  solvedEquations: 0,
};
