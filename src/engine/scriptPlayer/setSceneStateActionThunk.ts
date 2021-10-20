import {ISetSceneStateActionPayload, ISpecifiedAction} from '../actions';
import {IThunk} from '../redux/store';
import {endAction} from './scriptPlayerSlice';
import {setSceneMultiState} from '../redux/worldSlice';
import {ISceneId} from '../../game/scenes';
import {IWorldState} from '../../game/worldState';

interface IStartSetSceneStateActionArgs<T extends ISceneId, U extends IWorldState['scenes'][T]> {
  action: ISpecifiedAction<ISetSceneStateActionPayload<T, U>>;
}

type IStartSetSceneStateAction = <T extends ISceneId, U extends IWorldState['scenes'][T]>(args: IStartSetSceneStateActionArgs<T, U>) => IThunk;

export const startSetSceneStateAction: IStartSetSceneStateAction =
  ({action}) =>
  dispatch => {
    // console.log('%c [mr] startSetSceneStateAction', 'background-color:Gold; color: black', action);

    const {
      payload: {sceneId, state: stateToUpdate},
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

export const endSetSceneStateAction = (): IThunk => () => {
  // console.log('%c [mr] endSetSceneStateAction', 'background-color:Gold; color: black');
};
