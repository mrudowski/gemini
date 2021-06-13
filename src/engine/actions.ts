import {IActorId} from '../sampleGame01/actors';
import TALK_OPTIONS from '../sampleGame01/talkOptions';

export interface IActionPayload {
  id?: string,
  when?: boolean,
  next?: string
}

/**
 * duration in seconds
 */
type IDuration = number;

export interface ISetSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T
  stateValue: T[keyof T]
}

export interface ITalkActionPayload extends IActionPayload {
  text: string,
  autoPlayAfter?: IDuration,
  actor?: IActorId
  actorName?: string
}

interface ITalkOption {
  id: keyof typeof TALK_OPTIONS,
  next?: string
  text?: string
  when?: boolean
}

export interface ITalkOptionsActionPayload extends IActionPayload {
  actor?: IActorId
  actorName?: string
  options: ITalkOption[]
}

export interface IWaitActionPayload extends IActionPayload {
  duration?: IDuration
}

export interface IAction {
  actionName: IActionName,
  id?: string,
  when: boolean
  // TODO ? divide it on payload and options (id, when)
  payload: any // TODO for now only
}

export interface ISpecifiedAction<T> extends IAction {
  payload: Omit<T, 'when'>
}

const getSpecificAction = (actionName: IActionName, payload: IActionPayload = {}): IAction => {
  const {
    when = true,
    id,
    ...actionSpecificPayload
  } = payload;

  return {
    actionName,
    id,
    when,
    payload: actionSpecificPayload
  };
};


export const ACTIONS_NAMES = {
  SET_CURRENT_SCENE_STATE: 'SET_CURRENT_SCENE_STATE',
  TALK: 'TALK',
  TALK_OPTIONS: 'TALK_OPTIONS',
  END_TALK: 'END_TALK',
  WAIT: 'WAIT'
} as const; // wow

type IActionName = keyof typeof ACTIONS_NAMES;

const setCurrentSceneState = <T>(payload: ISetSceneStateActionPayload<T>): ISpecifiedAction<ISetSceneStateActionPayload<T>> => getSpecificAction(ACTIONS_NAMES.SET_CURRENT_SCENE_STATE, payload);
const talk = (payload: ITalkActionPayload): ISpecifiedAction<ITalkActionPayload> => getSpecificAction(ACTIONS_NAMES.TALK, payload);
const talkOptions = (payload: ITalkOptionsActionPayload): ISpecifiedAction<ITalkOptionsActionPayload> => getSpecificAction(ACTIONS_NAMES.TALK_OPTIONS, payload);
const endTalk = (): IAction => getSpecificAction(ACTIONS_NAMES.END_TALK);
const wait = (payload?: IWaitActionPayload): ISpecifiedAction<IWaitActionPayload> => getSpecificAction(ACTIONS_NAMES.WAIT, payload);

const ACTIONS = {
  setCurrentSceneState,
  talk,
  talkOptions,
  endTalk,
  wait
};

export default ACTIONS;
