import {DYNAMIC_CONDITIONS_SELECTORS} from '../../../game/dynamicConditions';
import {ITalkOptionId, ITalkOptionsActors} from '../types';
import {IActorTalkOptions} from '../../World/worldStateUtils';

export const checkDynamicCondition = dynamicConditionId => {
  if (dynamicConditionId) {
    const dynamicConditionFunction = DYNAMIC_CONDITIONS_SELECTORS[dynamicConditionId];
    if (dynamicConditionFunction) {
      return dynamicConditionFunction();
    }
  }
  return true;
};

export const checkIfAsked = ({
  actorTalkOptions,
  optionId,
}: {
  actorTalkOptions: IActorTalkOptions<ITalkOptionsActors>;
  optionId?: ITalkOptionId;
}) => {
  if (optionId) {
    const asked: boolean = actorTalkOptions[optionId];
    if (asked === null || asked === undefined) {
      throw new Error('checkIfAsked: missing option "' + optionId + '" !');
    }
    return asked;
  }
  return true;
};
