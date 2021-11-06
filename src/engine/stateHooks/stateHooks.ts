import {useTypedSelector} from '../redux/store';
import {getActorState, getSceneState} from '../redux/worldSlice';
import {IWorldState} from '../../game/worldState';
import {ISceneId} from '../../game/scenes';
import {IActorId} from '../../game/actors';

// export const useGetCurrentSceneState = () => {
//   const currentSceneState = useTypedSelector(getCurrentSceneState);
//   return currentSceneState;
// };

type IUseSceneState = <T extends ISceneId>(sceneId: T) => IWorldState['scenes'][T];

export const useSceneState: IUseSceneState = (sceneId: ISceneId) => {
  const sceneState = useTypedSelector(getSceneState(sceneId));
  return sceneState;
};

type IUseActorState = <T extends IActorId>(actorId: T) => IWorldState['actors'][T];

export const useActorState: IUseActorState = (actorId: IActorId) => {
  const actorState = useTypedSelector(getActorState(actorId));
  return actorState;
};
