import ISceneState from '../../../engine/redux/SceneState';

export interface ITeaShopSceneState extends ISceneState {
  tableDishesExamineCounter: number,
}

export const teaShopSceneInitialState: ITeaShopSceneState = {
  visited: false,
  tableDishesExamineCounter: 0,
};
