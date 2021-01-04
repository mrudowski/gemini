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


const talk = (payload: ITalkActionPayload): IAction => getSpecificAction(VERBS.TALK, payload);

const ACTIONS = {
  talk,
};

export default ACTIONS;
