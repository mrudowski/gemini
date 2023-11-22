import {IThunk} from '../../redux/store';
import {endAction} from '../../scriptPlayer/scriptPlayerSlice';
import {setGlobalMultiState} from '../../World/worldSlice';
import {ISpecifiedAction} from '../types';
import {ISetGlobalStateActionPayload} from './setGlobalState';

type IStartSetGlobalStateAction = (args: ISpecifiedAction<ISetGlobalStateActionPayload>) => IThunk;

export const startSetGlobalStateAction: IStartSetGlobalStateAction = action => dispatch => {
  // console.log('%c [mr] startSetWorldStateAction', 'background-color:Gold; color: black', action);

  const {
    payload: {state: stateToUpdate},
  } = action;

  if (!stateToUpdate) {
    throw new Error('required "state" not defined for the action');
  }

  dispatch(
    setGlobalMultiState({
      stateToUpdate,
    })
  );

  dispatch(endAction());
};
