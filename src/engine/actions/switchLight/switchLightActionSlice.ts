import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {batch} from 'react-redux';
import {CSSProperties} from 'react';
import {IRootState} from '../../redux/store';
import {turnOffGemLock, turnOnGemLock} from '../../redux/tempSlice';
import {IDuration} from '../types';
import {ISwitchLightOffAction, ISwitchLightOnAction} from './switchLightTypes';

export interface ILightOff {
  style: CSSProperties | undefined;
  switchOnDuration: IDuration;
  switchOffDuration: IDuration;
}

interface ISwitchLightActionState {
  sceneLightOff: ILightOff | null;
  appLightOff: ILightOff | null;
}

const initialState: ISwitchLightActionState = {
  sceneLightOff: null,
  appLightOff: null,
};

const switchLightActionSlice = createSlice({
  name: 'switchLightAction',
  initialState,
  reducers: {
    startSwitchOffLightAction: (
      state: ISwitchLightActionState,
      action: PayloadAction<ReturnType<ISwitchLightOffAction>>
    ) => {
      const {level = 'scene', style, switchOnDuration = 1, switchOffDuration = 1} = action.payload.payload || {};
      if (level === 'scene') {
        state.sceneLightOff = {
          style,
          switchOnDuration,
          switchOffDuration,
        };
      } else {
        state.appLightOff = {
          style,
          switchOnDuration,
          switchOffDuration,
        };
      }
    },
    startSwitchOnLightAction: (
      state: ISwitchLightActionState,
      action: PayloadAction<ReturnType<ISwitchLightOnAction>>
    ) => {
      const {level = 'scene'} = action.payload.payload || {};
      if (level === 'scene') {
        state.sceneLightOff = null;
      } else {
        state.appLightOff = null;
      }
    },
  },
});

export default switchLightActionSlice.reducer;

/**
 * to use in onBeforeEnter
 * executeScriptAsOneSingleNotBlockingAction
 */
export const startSwitchOffSceneLight = switchLightActionSlice.actions.startSwitchOffLightAction;

// ------------ thunks

export const startSwitchOffLightAction = (action: ReturnType<ISwitchLightOffAction>) => dispatch => {
  batch(() => {
    // console.log('%c [mr] startSwitchOffLightAction', 'background-color:Gold; color: black', action);
    dispatch(switchLightActionSlice.actions.startSwitchOffLightAction(action));
    dispatch(turnOnGemLock());
  });
};

export const endSwitchOffLightAction = () => dispatch => {
  batch(() => {
    dispatch(turnOffGemLock());
  });
};

export const startSwitchOnLightAction = (action: ReturnType<ISwitchLightOffAction>) => dispatch => {
  batch(() => {
    dispatch(switchLightActionSlice.actions.startSwitchOnLightAction(action));
    dispatch(turnOnGemLock());
  });
};

export const endSwitchOnLightAction = () => dispatch => {
  batch(() => {
    dispatch(turnOffGemLock());
  });
};

// ------------ selectors

export const getAppLightOff = createSelector(
  [(state: IRootState) => state.switchLightAction.appLightOff],
  appLightOff => appLightOff
);

export const getSceneLightOff = createSelector(
  [(state: IRootState) => state.switchLightAction.sceneLightOff],
  sceneLightOff => sceneLightOff
);
