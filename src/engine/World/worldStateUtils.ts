import {IWorldState} from '../../game/worldState';
import TALK_OPTIONS from '../../game/actors/talkOptions';
import {ITalkOptions, ITalkOptionsActors} from '../Dialogue/types';

/**
 * Actors
 */

export type IActorTalkOptions<ACTOR extends ITalkOptionsActors> = {
  [key in keyof ITalkOptions[ACTOR]]: boolean;
};

export type IActorsState = {
  [key in keyof ITalkOptions]: IActorTalkOptions<key>;
};

const getActorTalkOptions = (actorId: ITalkOptionsActors) =>
  Object.keys(TALK_OPTIONS[actorId]).reduce((talkOptionsAsState, talkOptionId) => {
    talkOptionsAsState[talkOptionId] = false;
    return talkOptionsAsState;
  }, {} as IActorTalkOptions<ITalkOptionsActors>);

export const actorsInitialState = Object.keys(TALK_OPTIONS).reduce((actorsAsState, actorId) => {
  actorsAsState[actorId] = getActorTalkOptions(actorId as ITalkOptionsActors);
  return actorsAsState;
}, {} as IWorldState['actors']);

// ------------------------------------
