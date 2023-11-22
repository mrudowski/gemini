import {checkHazelEquationByHazel} from './closeups/hazelTableByHazel/actions';
import {checkHazelEquationByElm} from './closeups/hazelTableByElm/actions';
import {checkElmEquation} from './closeups/elmDeskByElm/actions';

const CUSTOM_ACTIONS = {
  checkHazelEquationByHazel: 'checkHazelEquationByHazel',
  checkHazelEquationByElm: 'checkHazelEquationByElm',
  checkElmEquation: 'checkElmEquation',
} as const;

export type ICustomActionId = keyof typeof CUSTOM_ACTIONS;

export const CUSTOM_ACTIONS_THUNKS = {
  checkHazelEquationByHazel,
  checkHazelEquationByElm,
  checkElmEquation,
};

export default CUSTOM_ACTIONS;
