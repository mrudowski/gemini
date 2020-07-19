import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {IAction, ITalkActionPayload} from '../actions';
import {IRootState, IThunk} from '../redux/store';
import VERBS from '../VerbMenu/verbs';
import {endTalkAction, setTalkAction} from './talkActionSlice';

interface IScriptPlayerState {
  script: IAction[] | null,
  action: IAction | null,
  sceneId: string,
  poiId: string,
  actionIndex: number,
}

const initialState: IScriptPlayerState = {
  script: null,
  action: null,
  sceneId: '',
  poiId: '',
  actionIndex: 0
};

const scriptPlayerSlice = createSlice({
  name: 'scriptPlayer',
  initialState,
  reducers: {
    setScript: (state: IScriptPlayerState, action: PayloadAction<{script: IAction[], sceneId: string, poiId: string}>) => {
      const {
        script,
        sceneId,
        poiId
      } = action.payload;
      state.script = script;
      state.sceneId = sceneId;
      state.poiId = poiId;
      state.actionIndex = 0;
    },
    increaseActionIndex: (state: IScriptPlayerState) => {
      if (state.script && state.actionIndex + 1 < state.script.length) {
        state.actionIndex = state.actionIndex + 1;
      } else {
        throw new Error('error when increaseActionIndex - out of range or no script');
      }

    }
    // playNextAction: (state: IScriptPlayerState) => {
    //   const action = state.script?.[state.actionIndex];
    //   if (action) {
    //     executeAction(action);
    //   } else {
    //     console.log('%c [playNextAction]', 'background-color:Gold; color: black', 'END');
    //   }
    // }
  }
});

export default scriptPlayerSlice.reducer;

const setScript = scriptPlayerSlice.actions.setScript;
const increaseActionIndex = scriptPlayerSlice.actions.increaseActionIndex;

export const playScript = ({script, sceneId, poiId}: {script: IAction[], sceneId: string, poiId: string}): IThunk => (dispatch) => {
  batch(() => {
    dispatch(setScript({script, sceneId, poiId}));
    dispatch(playNextAction());
  });
};

const playNextAction = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const {
    script,
    actionIndex
  } = state.scriptPlayer; // selector
  const action = script?.[actionIndex]; // selector
  if (action) {
    // dispatch(setTalkAction({action}));
    dispatch(getActionSetter(action.id).setTalkAction({action}));
    // action.interpreter(action.payload);
    // dispatch(executeAction({action}));
  } else {
    console.log('%c [playNextAction]', 'background-color:Gold; color: black', 'END');
  }
};


export const endAction = (): IThunk => (dispatch, getState) => {
  const state = getState();
  const {
    script,
    actionIndex
  } = state.scriptPlayer; // selector
  const action = script?.[actionIndex]; // selector
  if (action) {
    dispatch(getActionSetter(action.id).endTalkAction());
  } else {
    throw new Error('endAction cannot find `action`!');
  }
  if (script && actionIndex < script.length - 1) {
    batch(() => {
      dispatch(increaseActionIndex());
      dispatch(playNextAction());
    });
  } else {
    console.log('%c [endAction]', 'background-color:Gold; color: black');
  }
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
  [VERBS.TALK]: {
    setTalkAction,
    endTalkAction
  }
};

const getActionSetter = (actionId: string) => actionSettersMap[actionId];

// ------------ selectors

// const getCurrentScript = (state: IRootState) => state.scriptPlayer.script;
// const getCurrentActionIndex = (state: IRootState) => state.scriptPlayer.actionIndex;

// export const getCurrentAction = createSelector(
//   [getCurrentScript, getCurrentActionIndex],
//   (currentScript, currentActionIndex) =>  {
//     return currentScript?.[currentActionIndex] || null;
//   }
// );
