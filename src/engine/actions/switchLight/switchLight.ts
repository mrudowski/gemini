import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {
  ISwitchLightOffAction,
  ISwitchLightOffActionPayload,
  ISwitchLightOnAction,
  ISwitchLightOnActionPayload,
} from './switchLightTypes';

const switchLightOffDefaultPayload: ISwitchLightOffActionPayload = {
  level: 'scene',
  switchOnDuration: 1,
  switchOffDuration: 1,
};

/**
 * turn the light off
 */
export const switchLightOff: ISwitchLightOffAction = payload =>
  getSpecificAction(ACTIONS_NAMES.SWITCH_LIGHT_OFF, payload, switchLightOffDefaultPayload);

// ----------------------

const switchLightOnDefaultPayload: ISwitchLightOnActionPayload = {
  level: 'scene',
};

/**
 * turn the light on
 */
export const switchLightOn: ISwitchLightOnAction = payload =>
  getSpecificAction(ACTIONS_NAMES.SWITCH_LIGHT_ON, payload, switchLightOnDefaultPayload);
