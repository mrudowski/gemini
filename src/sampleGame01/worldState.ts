import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';

export interface IWorldState {
  scenes: {
    teaShop: ITeaShopSceneState,
  },
}

export const worldInitialState: IWorldState = {
  scenes: {
    teaShop: teaShopSceneInitialState
  }
};
