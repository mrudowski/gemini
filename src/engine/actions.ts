import VERBS from './VerbMenu/verbs';

interface ITalkActionPayload {
  text: string
}

export interface IAction {
  id: string,
  payload: object
}

const talk = (payload: ITalkActionPayload): IAction => {
  return {
    id: VERBS.TALK,
    payload
  };
};


const ACTIONS = {
  talk,
};

export default ACTIONS;
