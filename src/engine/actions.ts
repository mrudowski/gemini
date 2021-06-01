export interface IActionPayload {
  when?: boolean
  [key: string]: unknown
}

export interface ITalkActionPayload extends IActionPayload {
  text: string
}

export interface ISetSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T
  stateValue: T[keyof T]
}

export interface IAction {
  id: string,
  when: boolean
  payload: Record<string, unknown> | Record<string, never> // TODO for now only
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
  TALK: 'talk',
  SET_CURRENT_SCENE_STATE: 'setCurrentSceneState'
};

const talk = (payload: ITalkActionPayload): IAction => getSpecificAction(ACTIONS_IDS.TALK, payload);
const setCurrentSceneState = <T>(payload: ISetSceneStateActionPayload<T>): IAction => getSpecificAction(ACTIONS_IDS.SET_CURRENT_SCENE_STATE, payload);

const ACTIONS = {
  talk,
  setCurrentSceneState
};

export default ACTIONS;
