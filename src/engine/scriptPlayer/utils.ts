import {IAction} from '../actions/types';
import {END} from '../actions/constants';

const getIncrementedActionIndex = (script: IAction[], actionIndex: number) => {
  // console.log('%c [mr] getIncrementedActionIndex', 'background-color:Gold; color: black', script, actionIndex);
  const action = script[actionIndex];
  // console.log('%c [mr] action.when', 'background-color:Gold; color: black', action.when);
  if (action.when) {
    return actionIndex;
  } else {
    if (actionIndex + 1 >= script.length) {
      return -1;
    }
    // we ignore next param here - we assume it won't happen
    const nextActionIndex = actionIndex + 1;
    return getIncrementedActionIndex(script, nextActionIndex);
  }
};

export const getNextActionIndex = (script: IAction[] | null, actionIndex: number, next: string) => {
  let nextActionIndex = -1;
  if (!script) return nextActionIndex;

  if (next === END) {
    return nextActionIndex;
  }

  if (next) {
    nextActionIndex = script.findIndex(scriptAction => scriptAction.id === next);
    if (nextActionIndex === -1) {
      throw new Error('defined next script id "' + next + '" not found!');
    }
    // console.log('%c [mr] if next state.script', 'background-color:green; color: white', script, next);
    // console.log('%c [mr] if next nextActionIndex', 'background-color:green; color: white', nextActionIndex);
  } else if (actionIndex + 1 < script.length) {
    nextActionIndex = actionIndex + 1;
  } else {
    return nextActionIndex;
  }

  // console.log('%c [mr] getNextActionIndex ===', 'background-color:green; color: white', nextActionIndex);

  return getIncrementedActionIndex(script, nextActionIndex);
};
