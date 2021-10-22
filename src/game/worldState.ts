import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';
import TALK_OPTIONS from './talkOptions';
import ACTORS, {IActorId} from './actors';
import SCENES from './scenes';
import {elmWorkshopByHazelSceneInitialState, IElmWorkshopByHazelSceneState} from './scenes/elmWorkshopByHazel/state';
import {hazelWorkshopByHazelSceneInitialState, IHazelWorkshopByHazelSceneState} from './scenes/hazelWorkshopByHazel/state';

// TODO - move all helpers inside engine
//  worldState file have to be easy to manage!
type IActorTalkOptions = {
  [key in keyof typeof TALK_OPTIONS]: boolean;
};

export interface IWorldState {
  scenes: {
    [SCENES.teaShop]: ITeaShopSceneState;
    [SCENES.elmWorkshopByHazel]: IElmWorkshopByHazelSceneState;
    [SCENES.hazelWorkshopByHazel]: IHazelWorkshopByHazelSceneState;
    test: {
      test1: number;
    };
  };
  // TODO we have to decide later which we choose
  actors: Record<IActorId, IActorTalkOptions>;

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

const getActorTalkOptions = () =>
  Object.keys(TALK_OPTIONS).reduce((talkOptionsAsState, talkOptionId) => {
    talkOptionsAsState[talkOptionId] = false;
    return talkOptionsAsState;
  }, {} as IActorTalkOptions);

// console.log('%c [mr] ACTORS', 'background-color:Gold; color: black', ACTORS);
export const worldInitialState: IWorldState = {
  scenes: {
    [SCENES.teaShop]: teaShopSceneInitialState,
    [SCENES.elmWorkshopByHazel]: elmWorkshopByHazelSceneInitialState,
    [SCENES.hazelWorkshopByHazel]: hazelWorkshopByHazelSceneInitialState,
    test: {
      test1: 1,
    },
  },
  // TODO ok but move it outside this file - worldState have to be easy to manage!
  actors: Object.keys(ACTORS).reduce((actorsAsState, actorId) => {
    actorsAsState[actorId] = getActorTalkOptions();
    return actorsAsState;
  }, {} as IWorldState['actors']),
};
