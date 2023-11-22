import {IGotoSceneAction, IGotoSceneActionPayload} from './gotoSceneTypes';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

const defaultPayload: Omit<IGotoSceneActionPayload, 'scene'> = {
  pause: false,
};

export const gotoScene: IGotoSceneAction = payload =>
  getSpecificAction(ACTIONS_NAMES.GOTO_SCENE, payload, defaultPayload);
