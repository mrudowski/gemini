import useActorNameCondition from './useActorNameCondition';
import {useTypedSelector} from '../../redux/store';
import {getCurrentActorId} from '../../World/worldSlice';
import {IActorId} from '../types';

type IUseGetActorNameToDisplay = (args: {actorId?: IActorId; actorName?: string}) => string;

const useGetActorNameToDisplay: IUseGetActorNameToDisplay = ({actorId: actorIdIfNotEmpty, actorName}) => {
  const currentActorId = useTypedSelector(getCurrentActorId);
  const actorId = actorIdIfNotEmpty || currentActorId;
  const actorNameFromState = useActorNameCondition(actorId);
  return actorName || actorNameFromState || `[${actorId}]`;
};

export default useGetActorNameToDisplay;
