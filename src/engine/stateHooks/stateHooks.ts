import {useTypedSelector} from '../redux/store';
import {getSceneState} from '../redux/worldSlice';
import {IWorldState} from '../../game/worldState';
import {ISceneId} from '../../game/scenes';

// export const useGetCurrentSceneState = () => {
//   const currentSceneState = useTypedSelector(getCurrentSceneState);
//   return currentSceneState;
// };

type IUseSceneState = <T extends ISceneId>(sceneId: T) => IWorldState['scenes'][T];

export const useSceneState: IUseSceneState = (sceneId: ISceneId) => {
  const sceneState = useTypedSelector(getSceneState(sceneId));
  return sceneState as any;
};
