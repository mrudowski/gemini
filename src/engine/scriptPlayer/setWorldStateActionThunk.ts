import {ISetWorldStateActionPayload, ISpecifiedAction} from '../actions';
import {IThunk} from '../redux/store';
import {endAction} from './scriptPlayerSlice';
import {setWorldMultiState} from '../redux/worldSlice';

interface IStartSetWorldStateActionArgs {
  action: ISpecifiedAction<ISetWorldStateActionPayload>;
}

type IStartSetWorldStateAction = (args: IStartSetWorldStateActionArgs) => IThunk;

export const startSetWorldStateAction: IStartSetWorldStateAction =
  ({action}) =>
  dispatch => {
    // console.log('%c [mr] startSetWorldStateAction', 'background-color:Gold; color: black', action);

    const {
      payload: {state: stateToUpdate},
    } = action;

    if (!stateToUpdate) {
      throw new Error('required "state" not defined for the action');
    }

    dispatch(
      setWorldMultiState({
        stateToUpdate,
      })
    );

    dispatch(endAction());
  };

export const endSetWorldStateAction = (): IThunk => () => {
  // console.log('%c [mr] endSetWorldStateAction', 'background-color:Gold; color: black');
};
