import {useTypedSelector} from '../redux/store';
import {getSceneState} from '../redux/worldSlice';
import {IWorldState} from '../../game/worldState';
import {ISceneId} from '../../game/scenes';

// export const useGetCurrentSceneState = () => {
//   const currentSceneState = useTypedSelector(getCurrentSceneState);
//   return currentSceneState;
// };

type IUseGetSceneState = <T extends ISceneId>(sceneId: T) => IWorldState['scenes'][T]

export const useGetSceneState: IUseGetSceneState = (sceneId: ISceneId) => {
  const sceneState = useTypedSelector(getSceneState(sceneId));
  return sceneState as any;
};
