import ISceneState from '../../../engine/redux/SceneState';

export interface IElmDeskByElmSceneState extends ISceneState {
  solvedEquations: number;
  paramA: number;
  paramB: number;
  elmPuzzleSolved: boolean;
}

export const elmDeskByElmSceneInitialState: IElmDeskByElmSceneState = {
  visited: false,
  solvedEquations: 0,
  paramA: 0,
  paramB: 0,
  elmPuzzleSolved: false,
};
