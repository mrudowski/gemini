import {CSSProperties} from 'react';
import {IActionPayload, IDuration, ISpecifiedAction} from '../types';

export interface ISwitchLightOffActionPayload extends IActionPayload {
  level?: 'scene' | 'app';
  switchOnDuration?: IDuration;
  switchOffDuration?: IDuration;
  style?: CSSProperties;
}
export type ISwitchLightOffAction = (
  payload?: ISwitchLightOffActionPayload
) => ISpecifiedAction<ISwitchLightOffActionPayload>;

// --------------------------

export interface ISwitchLightOnActionPayload extends IActionPayload {
  level?: 'scene' | 'app';
}

export type ISwitchLightOnAction = (
  payload?: ISwitchLightOnActionPayload
) => ISpecifiedAction<ISwitchLightOnActionPayload>;
