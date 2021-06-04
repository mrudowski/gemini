import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';

export interface IWorldState {
  scenes: {
    teaShop: ITeaShopSceneState,
    test: {
      test1: number
    }
  },
}

export const worldInitialState: IWorldState = {
  scenes: {
    teaShop: teaShopSceneInitialState,
    test: {
      test1: 1
    }
  }
};
