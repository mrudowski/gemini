import {IAction, IActionPayload} from './types';
import {IActionName} from './actionsNames';

export const getSpecificAction = (
  actionName: IActionName,
  actionPayload: IActionPayload = {},
  defaultPayload: IActionPayload = {}
): IAction => {
  const {when = true, id, ...actionSpecificPayload} = actionPayload;
  const {when: noNeededDefaultWhen, id: noNeededDefaultId, ...defaultActionSpecificPayload} = defaultPayload;

  return {
    actionName,
    id,
    when,
    payload: {
      ...defaultActionSpecificPayload,
      ...actionSpecificPayload,
    },
  };
};
