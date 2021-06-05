export interface IActionPayload {
  when?: boolean
}

export interface ISetSceneStateActionPayload<T> extends IActionPayload {
  stateName: keyof T
  stateValue: T[keyof T]
}

export interface ITalkActionPayload extends IActionPayload {
  text: string,
  autoPlay?: boolean
}

export interface IWaitActionPayload extends IActionPayload {
  duration?: number
}

export interface IAction {
  id: string,
  when: boolean
  // TODO ? divide it on payload and options (id, when)
  payload: any // TODO for now only
}

export interface ISpecifiedAction<T> extends IAction {
  payload: Omit<T, 'when'>
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

const setCurrentSceneState = <T>(payload: ISetSceneStateActionPayload<T>): ISpecifiedAction<ISetSceneStateActionPayload<T>> => getSpecificAction(ACTIONS_IDS.SET_CURRENT_SCENE_STATE, payload);
const talk = (payload: ITalkActionPayload): ISpecifiedAction<ITalkActionPayload> => getSpecificAction(ACTIONS_IDS.TALK, payload);
const endTalk = (): IAction => getSpecificAction(ACTIONS_IDS.END_TALK);
const wait = (payload?: IWaitActionPayload): ISpecifiedAction<IWaitActionPayload> => getSpecificAction(ACTIONS_IDS.WAIT, payload);

const ACTIONS = {
  setCurrentSceneState,
  talk,
  endTalk,
  wait
};

export default ACTIONS;
