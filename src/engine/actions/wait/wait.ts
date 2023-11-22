import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IWaitAction, IWaitActionPayload} from './waitTypes';

const defaultPayload: IWaitActionPayload = {
  duration: 1,
};

export const wait: IWaitAction = payload => getSpecificAction(ACTIONS_NAMES.WAIT, payload, defaultPayload);
