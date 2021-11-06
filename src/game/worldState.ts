import {ITeaShopSceneState, teaShopSceneInitialState} from './scenes/teaShop/state';
import TALK_OPTIONS from './talkOptions';
import ACTORS, {IActorId} from './actors';
import SCENES from './scenes';
import {elmWorkshopByHazelSceneInitialState, IElmWorkshopByHazelSceneState} from './scenes/elmWorkshopByHazel/state';
import {
  hazelWorkshopByHazelSceneInitialState,
  IHazelWorkshopByHazelSceneState,
} from './scenes/hazelWorkshopByHazel/state';
import SETTINGS from './settings';

// TODO - move all helpers inside engine
//  worldState file have to be easy to manage!
type IActorTalkOptions = {
  [key in keyof typeof TALK_OPTIONS]: boolean;
};

export interface IWorldState {
  scenes: {
    [SCENES.teaShop]: ITeaShopSceneState;
    [SCENES.elmWorkshopByHazel]: IElmWorkshopByHazelSceneState;
    [SCENES.elmWorkshopByElm];
    [SCENES.hazelWorkshopByHazel]: IHazelWorkshopByHazelSceneState;
    [SCENES.hazelWorkshopByElm];
    test: {
      test1: number;
    };
  };
  currentActorId: IActorId;
  // TODO we have to decide later which we choose
  actors: Record<IActorId, IActorTalkOptions>;
  showElmHazelSwitch: boolean;

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
    [SCENES.elmWorkshopByElm]: null,
    [SCENES.hazelWorkshopByHazel]: hazelWorkshopByHazelSceneInitialState,
    [SCENES.hazelWorkshopByElm]: null,
    test: {
      test1: 1,
    },
  },
  currentActorId: SETTINGS.DEFAULT_ACTOR,
  // TODO ok but move it outside this file - worldState have to be easy to manage!
  actors: Object.keys(ACTORS).reduce((actorsAsState, actorId) => {
    actorsAsState[actorId] = getActorTalkOptions();
    return actorsAsState;
  }, {} as IWorldState['actors']),
  showElmHazelSwitch: false,
};
