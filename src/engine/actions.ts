import {IActorId} from '../game/actors';
import TALK_OPTIONS from '../game/talkOptions';
import {ISceneId} from '../game/scenes';
import {IWorldState} from '../game/worldState';

export interface IActionPayload {
  id?: string;
  when?: boolean;
  next?: string;
}

export interface IAction {
  actionName: IActionName;
  id?: string;
  when: boolean;
  // TODO ? divide it on payload and options (id, when)
  payload: any; // TODO for now only
}

export interface ISpecifiedAction<T> extends IAction {
  payload: Omit<T, 'when'>;
}

// ========================================

/**
 * duration in seconds
 */
type IDuration = number;

// -------------

export interface ISetCurrentSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T;
  stateValue: T[keyof T];
}

// -------------

export interface ITalkActionPayload extends IActionPayload {
  text: string;
  autoPlayAfter?: IDuration;
  actor?: IActorId;
  actorName?: string;
}

// -------------

export interface ITalkOption {
  id: keyof typeof TALK_OPTIONS;
  next?: string;
  text?: string;
  when?: boolean;
}

// -------------

export interface ITalkOptionsActionPayload extends IActionPayload {
  actor?: IActorId;
  actorName?: string;
  options: ITalkOption[];
}

// -------------

export interface IWaitActionPayload extends IActionPayload {
  duration?: IDuration;
}

// -------------

export interface IGotoSceneActionPayload extends IActionPayload {
  scene: ISceneId;
}

export type IGotoSceneAction = (payload: IGotoSceneActionPayload) => ISpecifiedAction<IGotoSceneActionPayload>;

// -------------

export interface ILookCloserActionPayload extends IActionPayload {
  scene: ISceneId;
}

export type ILookCloserAction = (payload: ILookCloserActionPayload) => ISpecifiedAction<ILookCloserActionPayload>;

// -------------

export interface ISetWorldStateActionPayload extends IActionPayload {
  state: Partial<IWorldState>;
}

export type ISetWorldStateAction = (
  payload: ISetWorldStateActionPayload
) => ISpecifiedAction<ISetWorldStateActionPayload>;

// -------------

export interface ISetSceneStateActionPayload<T extends ISceneId, U extends IWorldState['scenes'][T]>
  extends IActionPayload {
  scene: T;
  state: {
    [key in keyof U]?: U[keyof U];
  };
}

// Partial<IWorldState['scenes']> ?
export type ISetSceneStateAction = <T extends ISceneId, U extends IWorldState['scenes'][T]>(
  payload: ISetSceneStateActionPayload<T, U>
) => ISpecifiedAction<ISetSceneStateActionPayload<T, U>>;

// =============================================

const getSpecificAction = (actionName: IActionName, payload: IActionPayload = {}): IAction => {
  const {when = true, id, ...actionSpecificPayload} = payload;

  return {
    actionName,
    id,
    when,
    payload: actionSpecificPayload,
  };
};

// =============================================

export const ACTIONS_NAMES = {
  GOTO_SCENE: 'GOTO_SCENE',
  LOOK_CLOSER: 'LOOK_CLOSER',
  SET_WORLD_STATE: 'SET_WORLD_STATE',
  SET_SCENE_STATE: 'SET_SCENE_STATE',
  SET_CURRENT_SCENE_STATE: 'SET_CURRENT_SCENE_STATE',
  TALK: 'TALK',
  TALK_OPTIONS: 'TALK_OPTIONS',
  END_TALK: 'END_TALK',
  WAIT: 'WAIT',
} as const; // wow

export type IActionName = keyof typeof ACTIONS_NAMES;

const gotoScene: IGotoSceneAction = payload => getSpecificAction(ACTIONS_NAMES.GOTO_SCENE, payload);
const lookCloser: ILookCloserAction = payload => getSpecificAction(ACTIONS_NAMES.LOOK_CLOSER, payload);
const setWorldState: ISetWorldStateAction = payload => getSpecificAction(ACTIONS_NAMES.SET_WORLD_STATE, payload);
const setSceneState: ISetSceneStateAction = payload => getSpecificAction(ACTIONS_NAMES.SET_SCENE_STATE, payload);
const setCurrentSceneState = <T>(
  payload: ISetCurrentSceneStateActionPayload<T>
): ISpecifiedAction<ISetCurrentSceneStateActionPayload<T>> =>
  getSpecificAction(ACTIONS_NAMES.SET_CURRENT_SCENE_STATE, payload);
const talk = (payload: ITalkActionPayload): ISpecifiedAction<ITalkActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.TALK, payload);
const talkOptions = (payload: ITalkOptionsActionPayload): ISpecifiedAction<ITalkOptionsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.TALK_OPTIONS, payload);
// to pass `id`, `when` and `next` props
const endTalk = (payload?: IActionPayload): IAction => getSpecificAction(ACTIONS_NAMES.END_TALK, payload);
const wait = (payload?: IWaitActionPayload): ISpecifiedAction<IWaitActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.WAIT, payload);

const ACTIONS = {
  gotoScene,
  lookCloser,
  setWorldState,
  setSceneState,
  setCurrentSceneState,
  talk,
  talkOptions,
  endTalk,
  wait,
};

export default ACTIONS;
