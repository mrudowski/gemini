import ACTIONS_TYPES from './ActionMenu/actionsTypes';

interface ITalkActionPayload {
  text: string
}

export interface IActionObject {
  id: string,
  payload: {}
}

const talk = (payload: ITalkActionPayload): IActionObject => {
  return {
    id: ACTIONS_TYPES.TALK,
    payload
  }
}


const actions = {
  talk,
}

export default actions;
