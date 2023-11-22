import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {ISoundId} from '../../sound/soundSlice';

export interface IPlaySoundActionPayload extends IActionPayload {
  sound: ISoundId;
}
/**
 * play short sound
 */
export const playSound = (payload?: IPlaySoundActionPayload): ISpecifiedAction<IPlaySoundActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.PLAY_SOUND, payload);
