import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';
import TALK_OPTIONS from './talkOptions';
import ACTORS, {IActorId} from './actors';

// TODO - move IWorldState inside engine

// TODO common use?
// keyof typeof TALK_OPTIONS

type IActorTalkOptions = {
  [key in keyof typeof TALK_OPTIONS]: boolean
}

export interface IWorldState {
  scenes: {
    teaShop: ITeaShopSceneState,
    test: {
      test1: number
    }
  },
  // TODO we have to decide later which we choose
  actors: Record<IActorId, IActorTalkOptions>

  //   scenes: {
  //     previously: {
  //       //leafsClosed: true
  //     }
  //   },
  //   inventory: {
  //     //key: true
  //   },
  //
  //   notebook: {
  //     disabled: true
  //   },
  //
  //   scene: 'previously',
  //
  //   save: {
  //     title: '',
  //     date: ''
  //   }
}

const getActorTalkOptions = () => Object.keys(TALK_OPTIONS).reduce((talkOptionsAsState, talkOptionId) => {
  talkOptionsAsState[talkOptionId] = false;
  return talkOptionsAsState;
}, {} as IActorTalkOptions);

// console.log('%c [mr] ACTORS', 'background-color:Gold; color: black', ACTORS);
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
};
