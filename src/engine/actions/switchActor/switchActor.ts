import {ISwitchActorAction} from './switchActorTypes';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export const switchActor: ISwitchActorAction = payload => getSpecificAction(ACTIONS_NAMES.SWITCH_ACTOR, payload);
