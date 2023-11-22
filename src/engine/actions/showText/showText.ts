import {CSSProperties} from 'react';
import {IActionPayload, IDuration, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';

export interface IShowTextActionPayload extends IActionPayload {
  text: string;
  /**
   * if you want to go to next action after some time this the place,
   * just set duration (in seconds)
   */
  autoPlayAfter?: IDuration;
  position?: 'center' | 'custom';
  style?: CSSProperties;
}

const defaultPayload: IShowTextActionPayload = {
  text: '[PLACE FOR TEXT]',
  position: 'custom',
};

/**
 * show text in center or any specific place, styled as you like
 */
export const showText = (payload: IShowTextActionPayload): ISpecifiedAction<IShowTextActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.SHOW_TEXT, payload, defaultPayload);
