import {useTypedSelector} from '../redux/store';
import {getActorState, getCurrentActorId, getGlobalState, getPreviousSceneId, getSceneState} from '../World/worldSlice';
import {IWorldState} from '../../game/worldState';
import {getIsItemInInventoryMap, IInventoryItemId} from '../Inventory/inventorySlice';
import {IActorId, ITalkOptionsActors} from '../Dialogue/types';
import {ISceneId} from '../scene/Scene/types';
import {ICloseupId} from '../closeup/Closeup/types';
import {getNextSceneId, getPreviousSceneIdForNextScene} from '../redux/tempSliceSelectors';
import {isSavableScene} from '../redux/tempSlice';
import {getIsNoteInNotebookMap, INotebookNoteId} from '../notebook/notebookSlice';

// TODO we could put it close to their slices but for now it's ok

// export const useGetCurrentSceneState = () => {
//   const currentSceneState = useTypedSelector(getCurrentSceneState);
//   return currentSceneState;
// };

export const useSceneState = <T extends ISceneId | ICloseupId>(sceneId: T): IWorldState['scenes'][T] => {
  const sceneState = useTypedSelector(state => getSceneState(state, sceneId)) as IWorldState['scenes'][T];
  return sceneState;
};

type IUsePreviousScene = (sceneId: ISceneId) => ISceneId | null;
export const usePreviousScene: IUsePreviousScene = (sceneId: ISceneId) => {
  const nextSceneId = useTypedSelector(getNextSceneId);
  const previousSceneId = useTypedSelector(getPreviousSceneId);
  const previousSceneIdForNextScene = useTypedSelector(getPreviousSceneIdForNextScene);
  // new scene during transition
  if (nextSceneId === sceneId && previousSceneIdForNextScene && isSavableScene(previousSceneIdForNextScene)) {
    return previousSceneIdForNextScene;
  }
  return previousSceneId;
};

//

type IUseGlobalState = () => IWorldState['global'];
export const useGlobalState: IUseGlobalState = () => {
  const globalState = useTypedSelector(getGlobalState);
  return globalState;
};

//

type IUseActorState = <T extends ITalkOptionsActors>(actorId: T) => IWorldState['actors'][T];
export const useActorState: IUseActorState = (actorId: IActorId) => {
  const actorState = useTypedSelector(state => getActorState(state, actorId)) as any;
  return actorState;
};

type IUseCurrentActor = () => IActorId;
export const useCurrentActor: IUseCurrentActor = () => useTypedSelector(getCurrentActorId);

//

type IUseInventoryState = () => Record<IInventoryItemId, boolean>;
export const useInventoryState: IUseInventoryState = () => useTypedSelector(getIsItemInInventoryMap);

//

type IUseNotebookState = () => Record<INotebookNoteId, boolean>;
export const useNotebookState: IUseNotebookState = () => useTypedSelector(getIsNoteInNotebookMap);
