import {CSSProperties} from 'react';
import {IAction, IActionPayload, IDuration, ISpecifiedAction} from '../types';
import {getSpecificAction} from '../utils';
import {ACTIONS_NAMES} from '../actionsNames';
import {IActorId, ITalkOptionId} from '../../Dialogue/types';
import {IDynamicConditionId} from '../../../game/dynamicConditions';

export interface ITalkActionPayload extends IActionPayload {
  text: string;
  /**
   * duration in seconds
   */
  autoPlayAfter?: IDuration;
  actor?: IActorId;
  actorName?: string;
  portrait?: string | null;
}

export interface ITalkOption {
  id: ITalkOptionId; // | string; // string for custom id if needed - we have to take care of markActorTalkOptionAsAsked
  next?: string;
  text?: string;
  /**
   * decide when to display it.<br/>
   * This is STATIC condition, will be calculated BEFORE script
   */
  when?: boolean;
  /**
   * decide when to display it with a help of DYNAMIC_CONDITIONS functions.<br/>
   * This is DYNAMIC condition, will be calculated real-time inside script
   */
  dynamicWhen?: IDynamicConditionId;
  /**
   * show option only when specific option was asked.<br/>
   * This is DYNAMIC condition, will be calculated real-time inside script
   */
  whenAsked?: ITalkOptionId;
  style?: CSSProperties;
  // script?: IAction[]; alternative huge change - not now
}

export interface ITalkOptionsActionPayload extends IActionPayload {
  actor?: IActorId;
  actorName?: string;
  portrait?: string | null;
  options: ITalkOption[];
  layout?: 'short' | 'multiline' | 'cinematic';
}

export const talk = (payload: ITalkActionPayload): ISpecifiedAction<ITalkActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.TALK, payload);
export const talkOptions = (payload: ITalkOptionsActionPayload): ISpecifiedAction<ITalkOptionsActionPayload> =>
  getSpecificAction(ACTIONS_NAMES.TALK_OPTIONS, payload);
// to pass `id`, `when` and `next` props
export const endTalk = (payload?: IActionPayload): IAction => getSpecificAction(ACTIONS_NAMES.END_TALK, payload);
