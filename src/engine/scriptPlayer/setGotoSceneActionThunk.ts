import {batch} from 'react-redux';
import {IGotoSceneActionPayload, ISpecifiedAction} from '../actions';
import {IThunk} from '../redux/store';
import {endAction} from './scriptPlayerSlice';
import {setNextSceneId} from '../redux/tempSlice';

// TODO could be simple action state in gem?

interface IStartGotoSceneActionArgs {
  action: ISpecifiedAction<IGotoSceneActionPayload>;
}

type IStartGotoSceneAction = (args: IStartGotoSceneActionArgs) => IThunk;

export const startGotoSceneAction: IStartGotoSceneAction =
  ({action}) =>
  dispatch => {
    // console.log('%c [mr] startGotoSceneAction', 'background-color:Gold; color: black', action);

    const {
      payload: {scene: sceneId},
    } = action;

    if (!sceneId) {
      throw new Error('required "sceneId" not defined for the action');
    }

    batch(() => {
      dispatch(setNextSceneId(sceneId));
      dispatch(endAction());
    });
  };

export const endGotoSceneAction = (): IThunk => () => {
  // console.log('%c [mr] endGotoSceneAction', 'background-color:Gold; color: black');
};
