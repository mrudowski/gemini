import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IShakeCameraAction, IShakeCameraActionPayload} from './shakeCameraTypes';

const shakeCameraDefaultPayload: IShakeCameraActionPayload = {
  duration: 1,
};

/**
 * Camera shake effect
 */
export const shakeCamera: IShakeCameraAction = payload =>
  getSpecificAction(ACTIONS_NAMES.SHAKE_CAMERA, payload, shakeCameraDefaultPayload);
