import {createSlice, original, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
// import {original} from 'immer';
import {IThunk} from '../redux/store';
import {IAction} from '../actions/types';
import {getActionByIndex, getActionSetter, getSkipToActionOnInterrupt} from './scriptPlayerSliceSelectors';
import {getNextActionIndex} from './utils';
import {ACTIONS_NAMES} from '../actions/actionsNames';
import {getSceneState, setCurrentActorId, setGlobalMultiState, setSceneMultiState} from '../World/worldSlice';
import {CUSTOM_ACTIONS_THUNKS} from '../../game/customActions';
import {END} from '../actions/constants';
import {saveCurrentGame} from '../Gem/gemSlice';
import ACTIONS from '../actions/actions';
import {ISceneId} from '../scene/Scene/types';
import {ICloseupId} from '../closeup/Closeup/types';
import {startSwitchOffSceneLight} from '../actions/switchLight/switchLightActionSlice';
import {showHudThunk} from '../Hud/hudThunks';

interface scriptInQueue {
  script: IAction[];
  sceneId: string;
  poiId: string;
}

interface IScriptPlayerState {
  script: IAction[] | null;
  action: IAction | null;
  sceneId: string;
  poiId: string;
  actionIndex: number;
  skipToActionOnInterrupt: string | undefined;
  scriptsQueue: scriptInQueue[];
}

const initialState: IScriptPlayerState = {
  script: null,
  action: null,
  sceneId: '',
  poiId: '',
  actionIndex: 0,
  skipToActionOnInterrupt: undefined,
  scriptsQueue: [],
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
      if (state.script) {
        const originalState = original(state);

        // Should not happen anymore because of queue mechanizm
        if (state.actionIndex < state.script.length - 1) {
          console.log(
            '%c [scriptPlayer] ERROR! overwriting NOT finished script with new one',
            'background-color:red; color: white',
            originalState?.actionIndex,
            originalState?.script,
            script
          );
        } else {
          // Should not happen anymore
          console.log(
            '%c [scriptPlayer] WARNING? overwriting finished script with new one',
            'background-color:orange; color: black',
            originalState?.script,
            script
          );
        }
      }
      state.script = script;
      state.sceneId = sceneId;
      state.poiId = poiId;
      state.actionIndex = 0;
    },
    setNoScript: () => {
      // console.log('%c [scriptPlayer] setNoScript', 'background-color:black; color: gold');

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
    setSkipToActionOnInterrupt: (state: IScriptPlayerState, action: PayloadAction<string | undefined>) => {
      state.skipToActionOnInterrupt = action.payload;
    },
    addScriptToQueue: (
      state: IScriptPlayerState,
      action: PayloadAction<{script: IAction[]; sceneId: string; poiId: string}>
    ) => {
      state.scriptsQueue.push(action.payload);
    },
    removeScriptFromQueue: (state: IScriptPlayerState) => {
      state.scriptsQueue.shift();
    },
  },
});

export default scriptPlayerSlice.reducer;

const setScript = scriptPlayerSlice.actions.setScript;
const setNoScript = scriptPlayerSlice.actions.setNoScript;
const setNextActionIndex = scriptPlayerSlice.actions.setNextActionIndex;
const addScriptToQueue = scriptPlayerSlice.actions.addScriptToQueue;
const removeScriptFromQueue = scriptPlayerSlice.actions.removeScriptFromQueue;
export const setSkipToActionOnInterrupt = scriptPlayerSlice.actions.setSkipToActionOnInterrupt;

export const executeScriptAsOneSingleNotBlockingAction =
  ({script}: {script: IAction[]}) =>
  dispatch => {
    batch(() => {
      script.forEach(action => {
        if (action.when) {
          switch (action.actionName) {
            case ACTIONS_NAMES.SET_SCENE_STATE: {
              dispatch(setSceneMultiState({sceneId: action.payload.scene, stateToUpdate: action.payload.state}));
              break;
            }
            case ACTIONS_NAMES.SET_GLOBAL_STATE: {
              dispatch(setGlobalMultiState({stateToUpdate: action.payload.state}));
              break;
            }
            case ACTIONS_NAMES.SWITCH_ACTOR: {
              dispatch(setCurrentActorId(action.payload.actor));
              break;
            }
            case ACTIONS_NAMES.SWITCH_LIGHT_OFF: {
              dispatch(
                startSwitchOffSceneLight({
                  ...action,
                  payload: {
                    ...action.payload,
                    switchOffDuration: 0,
                  },
                })
              );
              break;
            }
            case ACTIONS_NAMES.HIDE_HUD: {
              dispatch(showHudThunk(true));
              break;
            }
            case ACTIONS_NAMES.CUSTOM: {
              dispatch(CUSTOM_ACTIONS_THUNKS[action.payload.action]());
              break;
            }
            default: {
              throw new Error('Action ' + action.actionName + ' not supported here! (in onBeforeEnter)');
            }
          }
        }
      });
    });
  };

export const playScript =
  ({script, sceneId = '', poiId = ''}: {script: IAction[]; sceneId?: string; poiId?: string}): IThunk =>
  (dispatch, getState) => {
    const scriptPlayerState = getState().scriptPlayer;
    if (scriptPlayerState.script) {
      console.log(
        '%c [scriptPlayer] we want to play new script but old script not finished yet so we queue new one',
        'background-color:black; color: gold',
        {
          oldActionIndex: scriptPlayerState.actionIndex,
          oldScript: scriptPlayerState.script,
          newScript: script,
        }
      );
      dispatch(addScriptToQueue({script, sceneId, poiId}));
      return;
    }

    console.log('%c [scriptPlayer] setSCRIPT', 'background-color:black; color: gold', script);

    batch(() => {
      dispatch(setScript({script, sceneId, poiId}));
      dispatch(playNextAction());
    });
  };

export const playOnEnterScript =
  ({script, sceneId}: {script: IAction[]; sceneId: ISceneId | ICloseupId}): IThunk =>
  (dispatch, getState) => {
    const sceneState = getSceneState(getState(), sceneId);
    // !sceneState because mainMenu was null before 18.11.2022
    const markSceneAsVisitedScript: IAction[] =
      !sceneState || sceneState.visited ? [] : [ACTIONS.setSceneState({scene: sceneId, state: {visited: true}})];
    if (script.length > 0 || markSceneAsVisitedScript.length > 0) {
      dispatch(playScript({script: [...script, ...markSceneAsVisitedScript], sceneId}));
    }
  };

export const setNoScriptThunk = (): IThunk => (dispatch, getState) => {
  const scriptPlayerState = getState().scriptPlayer;

  console.log('%c [scriptPlayer] setNoSCRIPT', 'background-color:black; color: gold');
  dispatch(setNoScript());

  if (scriptPlayerState.scriptsQueue.length > 0) {
    console.log(
      '%c [scriptPlayer] scriptsQueue not empty so we play it now',
      'background-color:black; color: gold',
      scriptPlayerState.scriptsQueue
    );
    batch(() => {
      dispatch(playScript({...scriptPlayerState.scriptsQueue[0]}));
      dispatch(removeScriptFromQueue());
    });
  } else {
    // it's safe to save!
    dispatch(saveCurrentGame());
  }
};

const playNextAction = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const {actionIndex} = state.scriptPlayer; // selector?
  const action = getActionByIndex(state, actionIndex);
  if (action) {
    if (action.when) {
      // console.log('%c [playNextAction] when true', 'background-color:Gold; color: black', action.id);
      console.log('%c [scriptPlayer] playAction', 'background-color:black; color: gold', action);
      dispatch(getActionSetter(action.actionName).startAction(action));
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

    const state = getState();
    const {script, actionIndex} = state.scriptPlayer; // selector

    if (!script) {
      // it's happened when we jump from talk options to action Set(World/Scene)State (without explicit call endTalk)
      // double dialogue onExitComplete
      //console.log('%c [endAction] no script (and further actions) found', 'background-color:RED; color: white');
      return;
    }

    const action = script?.[actionIndex]; // selector
    if (action) {
      // console.log('%c [endAction] action', 'background-color:black; color: gold', action);

      if (!playNextOverCurrent) {
        const actionSetter = getActionSetter(action.actionName);
        if (actionSetter.endAction) {
          // we have useWith and endUseWith endAction = null
          dispatch(getActionSetter(action.actionName).endAction() as any);
        }
      } else {
        notEndedActions.push(getActionSetter(action.actionName));
        //console.log('%c [notEndedActions] AFTER PUSH', 'background-color:RED; color: white', notEndedActions);
      }
    } else {
      throw new Error('endAction cannot find `action`!');
    }

    const endMethod = () => {
      // end not ended actions
      if (notEndedActions.length > 0) {
        const notEndedAction = notEndedActions.pop();
        // console.log('%c [notEndedAction] POPPED ACTION', 'background-color:red; color: white', notEndedAction);
        // console.log('%c [notEndedAction] AFTER POP', 'background-color:red; color: white', notEndedActions);
        dispatch(notEndedAction.endAction());
        endMethod();
      } else {
        const skipToActionOnInterrupt = getSkipToActionOnInterrupt(state);
        batch(() => {
          if (skipToActionOnInterrupt) {
            dispatch(setSkipToActionOnInterrupt(undefined));
          }
          dispatch(setNoScriptThunk());
        });
      }
    };

    const trueNext = next || action.payload.next || '';
    if (trueNext === END) {
      endMethod();
      return;
    }

    const nextActionIndex = getNextActionIndex(script, actionIndex, trueNext);
    if (nextActionIndex === -1) {
      endMethod();
      return;
    }

    batch(() => {
      dispatch(setNextActionIndex({nextActionIndex}));
      dispatch(playNextAction());
    });
  };

export const gotoAction =
  ({actionId}: {actionId: string}): IThunk =>
  dispatch => {
    const endActionParamObject: IEndActionParamObject = {
      next: actionId,
    };

    dispatch(endAction(endActionParamObject));
  };

export const skipToActionOnInterruptThunk = (): IThunk => (dispatch, getState) => {
  const skipToActionOnInterrupt = getSkipToActionOnInterrupt(getState());
  if (!skipToActionOnInterrupt) {
    throw new Error('cannot skip - action to skip is not defined');
  }
  batch(() => {
    dispatch(gotoAction({actionId: skipToActionOnInterrupt}));
    dispatch(setSkipToActionOnInterrupt(undefined));
  });
};
