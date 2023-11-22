import {IActionPayload, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IImage} from '../../Preload/types';

export interface IShowCreditsActionPayload extends IActionPayload {
  image?: IImage | null;
  dimmedBackdrop?: boolean;
  gameCompleted?: boolean;
}

export const defaultPayload: Partial<IShowCreditsActionPayload> = {
  image: null,
  dimmedBackdrop: true,
  gameCompleted: false,
};

export type IShowCreditsAction = (payload?: IShowCreditsActionPayload) => ISpecifiedAction<IShowCreditsActionPayload>;

/**
 * show credits from the main menu and at the end of the game
 */
export const showCredits = (payload?: IShowCreditsActionPayload): ISpecifiedAction<IShowCreditsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.SHOW_CREDITS, payload, defaultPayload);
