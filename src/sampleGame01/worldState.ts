import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';
import TALK_OPTIONS from './talkOptions';
import ACTORS from './actors';

// TODO - move IWorldState inside engine

// TODO common use?
// keyof typeof TALK_OPTIONS

type IActorTalkOptions = {
  [key in keyof Omit<(typeof TALK_OPTIONS), 'end'>]: boolean
}

type ITalkOptions = {
  [key in keyof Omit<(typeof TALK_OPTIONS), 'end'>]: string[]
}

export interface IWorldState {
  scenes: {
    teaShop: ITeaShopSceneState,
    test: {
      test1: number
    }
  },
  // TODO we have to decide later which we choose
  actors: {
    [key in keyof typeof ACTORS]: IActorTalkOptions
  }
  talkOptions: ITalkOptions
}

const getActorTalkOptions = () => Object.keys(TALK_OPTIONS).reduce((talkOptionsAsState, talkOptionId) => {
  if (talkOptionId !== TALK_OPTIONS.end) {
    talkOptionsAsState[talkOptionId] = false;
  }
  return talkOptionsAsState;
}, {} as IActorTalkOptions);

const getTalkOptions = () => Object.keys(TALK_OPTIONS).reduce((talkOptionsAsState, talkOptionId) => {
  if (talkOptionId !== TALK_OPTIONS.end) {
    talkOptionsAsState[talkOptionId] = [];
  }
  return talkOptionsAsState;
}, {} as ITalkOptions);

export const worldInitialState: IWorldState = {
  scenes: {
    teaShop: teaShopSceneInitialState,
    test: {
      test1: 1
    }
  },
  actors: Object.keys(ACTORS).reduce((actorsAsState, actorId) => {
    actorsAsState[actorId] = getActorTalkOptions();
    return actorsAsState;
  }, {} as IWorldState['actors']),
  talkOptions: getTalkOptions()
};
