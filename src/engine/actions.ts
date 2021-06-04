export interface IActionPayload {
  when?: boolean
  [key: string]: unknown
}

export interface ISetSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T
  stateValue: T[keyof T]
}

export interface ITalkActionPayload extends IActionPayload {
  text: string
}

export interface IWaitActionPayload extends IActionPayload {
  duration?: number
}


export interface IAction {
  id: string,
  when: boolean
  // TODO ? divide it on payload and options (id, when)
  payload: Record<string, unknown> | Record<string, never> // TODO for now only
}

export interface IWaitAction {
  id: string,
  when: boolean
  payload: IWaitActionPayload
}

const getSpecificAction = (id: string, payload: IActionPayload = {}): IAction => {
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
  SET_CURRENT_SCENE_STATE: 'setCurrentSceneState',
  TALK: 'talk',
  END_TALK: 'endTalk',
  WAIT: 'wait'
};

const setCurrentSceneState = <T>(payload: ISetSceneStateActionPayload<T>): IAction => getSpecificAction(ACTIONS_IDS.SET_CURRENT_SCENE_STATE, payload);
const talk = (payload: ITalkActionPayload): IAction => getSpecificAction(ACTIONS_IDS.TALK, payload);
const endTalk = (): IAction => getSpecificAction(ACTIONS_IDS.END_TALK);
const wait = (payload?: IWaitActionPayload): IAction => getSpecificAction(ACTIONS_IDS.WAIT, payload);

const ACTIONS = {
  setCurrentSceneState,
  talk,
  endTalk,
  wait
};

export default ACTIONS;
