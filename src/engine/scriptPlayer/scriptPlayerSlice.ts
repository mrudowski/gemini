import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
// import {original} from 'immer';
import {ACTIONS_NAMES, IAction} from '../actions';
import {IRootState, IThunk} from '../redux/store';
import {endTalkAction, startTalkAction} from './talkActionSlice';
import {endSetCurrentSceneStateAction, startSetCurrentSceneStateAction} from './setCurrentSceneStateActionThunk';
import {endWaitAction, startWaitAction} from './waitActionSlice';
import {endSetSceneStateAction, startSetSceneStateAction} from './setSceneStateActionThunk';
import {endGotoSceneAction, startGotoSceneAction} from './setGotoSceneActionThunk';
import {endSetWorldStateAction, startSetWorldStateAction} from './setWorldStateActionThunk';

interface IScriptPlayerState {
  script: IAction[] | null;
  action: IAction | null;
  sceneId: string;
  poiId: string;
  actionIndex: number;
}

const initialState: IScriptPlayerState = {
  script: null,
  action: null,
  sceneId: '',
  poiId: '',
  actionIndex: 0,
};

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

const getNextActionIndex = (script: IAction[] | null, actionIndex: number, next: string) => {
  let nextActionIndex = -1;
  if (!script) return nextActionIndex;

  if (next) {
    nextActionIndex = script.findIndex(scriptAction => scriptAction.id === next);
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

const scriptPlayerSlice = createSlice({
  name: 'scriptPlayer',
  initialState,
  reducers: {
    setScript: (
      state: IScriptPlayerState,
      action: PayloadAction<{script: IAction[]; sceneId: string; poiId: string}>
    ) => {
      const {script, sceneId, poiId} = action.payload;
      console.log('%c [scriptPlayer] setScript', 'background-color:Gold; color: black', script);
      state.script = script;
      state.sceneId = sceneId;
      state.poiId = poiId;
      state.actionIndex = 0;
    },
    setNoScript: () => {
      console.log('%c [scriptPlayer] setNoScript', 'background-color:Gold; color: black');
      return {
        ...initialState,
      };
    },
    setNextActionIndex: (state: IScriptPlayerState, action: PayloadAction<{nextActionIndex: number}>) => {
      const {nextActionIndex} = action.payload;

      // console.log('%c [mr] nextActionIndex ---> state', 'background-color:red; color: black', nextActionIndex);

      if (nextActionIndex !== -1) {
        state.actionIndex = nextActionIndex;
      } else {
        throw new Error('error when increaseActionIndex - out of range or no script');
      }
    },
  },
});

export default scriptPlayerSlice.reducer;

const setScript = scriptPlayerSlice.actions.setScript;
const setNoScript = scriptPlayerSlice.actions.setNoScript;
const setNextActionIndex = scriptPlayerSlice.actions.setNextActionIndex;

export const playScript =
  ({script, sceneId, poiId}: {script: IAction[]; sceneId: string; poiId: string}): IThunk =>
  dispatch => {
    batch(() => {
      dispatch(setScript({script, sceneId, poiId}));
      dispatch(playNextAction());
    });
  };

const playNextAction = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const {actionIndex} = state.scriptPlayer; // selector?
  const action = getActionByIndex(actionIndex)(state);
  if (action) {
    if (action.when) {
      // console.log('%c [playNextAction] when true', 'background-color:Gold; color: black', action.id);
      dispatch(getActionSetter(action.actionName).startAction({action}) as any);
    } else {
      // console.log('%c [playNextAction] when false', 'background-color:Gold; color: black', action.id);
      dispatch(endAction());
    }
    // dispatch(setTalkAction({action}));
    // action.interpreter(action.payload);
    // dispatch(executeAction({action}));
  } else {
    throw new Error('playNextAction could not get action from script at index: ' + actionIndex);
  }
};

const notEndedActions: any = [];

export type IEndActionParamObject = {
  next?: string;
  playNextOverCurrent?: boolean;
};

export const endAction =
  (endActionParamObject?: IEndActionParamObject): IThunk =>
  (dispatch, getState) => {
    const {next, playNextOverCurrent = false} = endActionParamObject || {};

    console.log('%c [endAction] playNextOverCurrent', 'background-color:Gold; color: black', playNextOverCurrent);
    console.log('%c [endAction] endActionParamObject', 'background-color:Gold; color: black', endActionParamObject);

    const state = getState();
    const {script, actionIndex} = state.scriptPlayer; // selector

    const action = script?.[actionIndex]; // selector
    if (action) {
      if (!playNextOverCurrent) {
        dispatch(getActionSetter(action.actionName).endAction() as any);
      } else {
        notEndedActions.push(getActionSetter(action.actionName));
        console.log('%c [notEndedActions]', 'background-color:RED; color: black', notEndedActions);
      }
    } else {
      throw new Error('endAction cannot find `action`!');
    }

    const endMethod = () => {
      console.log('%c [endAction]', 'background-color:Gold; color: black');
      // end not ended actions
      if (notEndedActions.length > 0) {
        // TODO good enough?
        const notEndedAction = notEndedActions.pop();
        console.log('%c [notEndedAction]', 'background-color:Gold; color: black', notEndedAction);
        dispatch(notEndedAction.endAction());
      } else {
        dispatch(setNoScript());
      }
    };

    const trueNext = next || action.payload.next || '';
    // console.log('%c [mr] -------->', 'background-color:Gold; color: black', trueNext);
    if (trueNext === 'end') {
      endMethod();
      return;
    }

    const nextActionIndex = getNextActionIndex(script, actionIndex, trueNext);
    if (nextActionIndex === -1) {
      endMethod();
      return;
    }

    batch(() => {
      // console.log('%c [mr] batch', 'background-color:deeppink; color: black', next, action.payload.next);
      if (trueNext) {
        // console.log('%c [mr] -------- TODO validNext', 'background-color:red; color: black', trueNext);
      }
      dispatch(setNextActionIndex({nextActionIndex}));
      dispatch(playNextAction());
    });
  };

//
// const executeAction = ({action}: {action: IAction}): IThunk => (dispatch, getState) => {
//   const state = getState();
//   console.log('%c [mr]', 'background-color:Gold; color: black');
//
//   switch (action.id) {
//     case VERBS.TALK: {
//       console.log('%c [executeAction]', 'background-color:Gold; color: black', 'talk');
//       break;
//     }
//     default: {
//       throw new Error('We do not know this `action`: ' + action.id);
//     }
//   }
// };

// TODO move to actionsSlice?

// export const talkActionInterpreter = ({text}: ITalkActionPayload): IThunk => (dispatch, getState) => {
//   const state = getState();
//   dispatch()
//   console.log('%c [talkActionInterpreter]', 'background-color:Gold; color: black', text);
// };

const actionSettersMap = {
  [ACTIONS_NAMES.GOTO_SCENE]: {
    startAction: startGotoSceneAction,
    endAction: endGotoSceneAction,
  },
  [ACTIONS_NAMES.SET_WORLD_STATE]: {
    startAction: startSetWorldStateAction,
    endAction: endSetWorldStateAction, // TODO could be without it
  },
  [ACTIONS_NAMES.SET_SCENE_STATE]: {
    startAction: startSetSceneStateAction,
    endAction: endSetSceneStateAction, // TODO could be without it
  },
  [ACTIONS_NAMES.SET_CURRENT_SCENE_STATE]: {
    startAction: startSetCurrentSceneStateAction,
    endAction: endSetCurrentSceneStateAction, // TODO could be without it
  },
  [ACTIONS_NAMES.TALK]: {
    startAction: startTalkAction,
    endAction: endTalkAction,
  },
  [ACTIONS_NAMES.TALK_OPTIONS]: {
    startAction: startTalkAction,
    endAction: endTalkAction,
  },
  [ACTIONS_NAMES.END_TALK]: {
    startAction: endTalkAction, // TODO dirty
    endAction: endTalkAction,
  },
  [ACTIONS_NAMES.WAIT]: {
    startAction: startWaitAction,
    endAction: endWaitAction,
  },
};

// ------------ selectors

const getActionSetter = (actionId: string) => actionSettersMap[actionId];
// const getNextAction = () => {};

export const getCurrentScript = (state: IRootState) => state.scriptPlayer.script;
export const getCurrentActionIndex = (state: IRootState) => state.scriptPlayer.actionIndex;

const getCurrentAction = createSelector(
  [getCurrentScript, getCurrentActionIndex],
  (currentScript, currentActionIndex) => {
    return currentScript?.[currentActionIndex] || null;
  }
);

const getActionByIndex = (index: number) =>
  createSelector([getCurrentScript], currentScript => {
    return currentScript?.[index] || null;
  });

export const getNextActiveAction = createSelector(
  [getCurrentScript, getCurrentActionIndex, (state: IRootState) => state],
  (currentScript, currentActionIndex, state) => {
    const currentAction = getCurrentAction(state);
    const when = currentAction?.payload.next || '';

    const nextActionIndex = getNextActionIndex(state.scriptPlayer.script, state.scriptPlayer.actionIndex, when);

    if (nextActionIndex === -1) {
      return null;
    }
    return getActionByIndex(nextActionIndex)(state);
  }
);
