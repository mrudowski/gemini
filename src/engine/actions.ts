import VERBS from './VerbMenu/verbs';
import {ITeaShopSceneState} from '../sampleGame01/scenes/teaShop/state';

export interface IActionPayload {
  when?: boolean
}

export interface ITalkActionPayload extends IActionPayload {
  text: string
}

export interface ISetSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T
  stateValue: unknown
}

export interface IAction {
  id: string,
  when: boolean
  payload: {key?: string} // TODO for now only
}

const getSpecificAction = (id: string, payload: IActionPayload): IAction => {
  const {
    when = true,
    ...actionSpecificPayload
  } = payload;

  return {
    id,
    when,
    payload: actionSpecificPayload
  };
};

export const ACTIONS_IDS = {
  TALK: VERBS.TALK, // TODO small/capital letters?
  SET_CURRENT_SCENE_STATE: 'SET_CURRENT_SCENE_STATE'
};

const talk = (payload: ITalkActionPayload): IAction => getSpecificAction(ACTIONS_IDS.TALK, payload);
const setCurrentSceneState = <T>(payload: ISetSceneStateActionPayload<T>): IAction => getSpecificAction(ACTIONS_IDS.SET_CURRENT_SCENE_STATE, payload);

const ACTIONS = {
  talk,
  setCurrentSceneState
};

export default ACTIONS;
