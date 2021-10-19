import useActorNameCondition from './useActorNameCondition';
import {IActorId} from '../../../game/actors';
import SETTINGS from '../../../game/settings';

type IUseGetActorNameToDisplay = (args: {actorId?: IActorId; actorName?: string}) => string;

const useGetActorNameToDisplay: IUseGetActorNameToDisplay = ({actorId = SETTINGS.DEFAULT_ACTOR, actorName}) => {
  const actorNameFromState = useActorNameCondition(actorId);
  return actorName || actorNameFromState || `[${actorId}]`;
};

export default useGetActorNameToDisplay;
