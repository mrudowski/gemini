import VERBS from './VerbMenu/verbs';

interface ITalkActionPayload {
  text: string
}

export interface IActionObject {
  id: string,
  payload: {}
}

const talk = (payload: ITalkActionPayload): IActionObject => {
  return {
    id: VERBS.TALK,
    payload
  }
}


const actions = {
  talk,
}

export default actions;
