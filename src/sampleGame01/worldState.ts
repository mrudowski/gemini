import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';
import TALK_OPTIONS from './talkOptions';
import ACTORS from './actors';

// TODO - move IWorldState inside engine

// TODO common use?
// keyof typeof TALK_OPTIONS

type IActorTalkOptions = {
  [key in keyof Omit<(typeof TALK_OPTIONS), 'end'>]: boolean
}

export interface IWorldState {
  scenes: {
    teaShop: ITeaShopSceneState,
    test: {
      test1: number
    }
  },
  actors: {
    [key in keyof typeof ACTORS]: IActorTalkOptions
  }
  // talkOptions: {
  //   [key in keyof typeof t.talkOptions]: string[]
  // }
}

const getTalkOptions = () => Object.keys(TALK_OPTIONS).reduce((talkOptionsAsState, talkOptionId) => {
  if (talkOptionId !== TALK_OPTIONS.end) {
    talkOptionsAsState[talkOptionId] = false;
  }
  return talkOptionsAsState;
}, {} as IActorTalkOptions);

export const worldInitialState: IWorldState = {
  scenes: {
    teaShop: teaShopSceneInitialState,
    test: {
      test1: 1
    }
  },
  actors: Object.keys(ACTORS).reduce((actorsAsState, actorId) => {
    actorsAsState[actorId] = getTalkOptions();
    return actorsAsState;
  }, {} as IWorldState['actors'])
};
