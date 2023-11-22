import {IThunk} from '../../redux/store';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {setSceneMultiState} from '../../World/worldSlice';
import {IWorldState} from '../../../game/worldState';
import {ISceneId} from '../../scene/Scene/types';
import {ISpecifiedAction} from '../types';
import {ISetSceneStateActionPayload} from './setSceneState';

type IStartSetSceneStateAction = <T extends ISceneId, U extends IWorldState['scenes'][T]>(
  args: ISpecifiedAction<ISetSceneStateActionPayload<T, U>>
) => IThunk;

export const startSetSceneStateAction: IStartSetSceneStateAction = action => dispatch => {
  // console.log('%c [mr] startSetSceneStateAction', 'background-color:Gold; color: black', action);

  const {
    payload: {scene: sceneId, state: stateToUpdate},
  } = action;

  if (!sceneId || !stateToUpdate) {
    throw new Error('required "sceneId" or "state" not defined for the action');
  }

  dispatch(
    setSceneMultiState({
      sceneId,
      stateToUpdate,
    })
  );

  dispatch(endAction());
};
