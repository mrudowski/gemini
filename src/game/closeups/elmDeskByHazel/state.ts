import ISceneState from '../../../engine/redux/SceneState';

export interface IElmDeskByHazelSceneState extends ISceneState {
  // solvedEquations: number; // I remove it because we will use state from ElmDeskByElm
  hazelEquatOn: boolean;
}

export const elmDeskByHazelSceneInitialState: IElmDeskByHazelSceneState = {
  visited: false,
  // solvedEquations: 0,
  hazelEquatOn: false,
};
