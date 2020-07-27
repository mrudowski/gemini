import VERBS from './VerbMenu/verbs';

export interface IActionPayload {
  when?: boolean
}

export interface ITalkActionPayload extends IActionPayload {
  text: string
}

export interface IAction {
  id: string,
  when: boolean
  payload: object
}

const getSpecifcAction = (id: string, payload: IActionPayload): IAction => {
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


const talk = (payload: ITalkActionPayload): IAction => getSpecifcAction(VERBS.TALK, payload);

const ACTIONS = {
  talk,
};

export default ACTIONS;
