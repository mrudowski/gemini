import ISceneState from '../../../engine/redux/SceneState';

export interface IHazelTableByHazelSceneState extends ISceneState {
  solvedEquations: number;
  redFlowerBox: number;
  blueFlowerBox: number;
  yellowFlowerBox: number;
  greenLeafBox: number;
  yellowLeafBox: number;
  purpleLeafBox: number;
  blueStalkBox: number;
  pinkStalkBox: number;
  greenStalkBox: number;
}

export const hazelTableByHazelSceneBoxesInitialState = {
  redFlowerBox: 0,
  blueFlowerBox: 0,
  yellowFlowerBox: 0,
  greenLeafBox: 0,
  yellowLeafBox: 0,
  purpleLeafBox: 0,
  blueStalkBox: 0,
  pinkStalkBox: 0,
  greenStalkBox: 0,
};

export const hazelTableByHazelSceneInitialState: IHazelTableByHazelSceneState = {
  visited: false,
  solvedEquations: 0,
  ...hazelTableByHazelSceneBoxesInitialState,
};
